import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { ShopApiService } from 'src/app/services/shop-api.service'
import { ShopService } from 'src/app/services/shop.service'

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: any

  upgradeForm!: FormGroup;

  userFile: any = File

  imageName: string

  @ViewChild('inputImg') inputImg: ElementRef

  constructor(private service: ServiceService, private apiService: ShopApiService, private shopService: ShopService,
    private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.createForm()

    this.product = this.shopService.getUpgProduct()

    //Verifica se existe produto(só vai existir caso seja clicado em editar no home-produto)
    //É para bloquear que a pagina de update seja acessada de qualquer lugar
    if (this.product !== undefined) {

      this.upgradeForm.setValue(this.product[0])
      this.imageName = this.product[0].formato_imagem

    } else {
      this.route.navigate(['/adm-crud/home-product'])
    }

  }

  createForm() {
    this.upgradeForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      preco: [null, Validators.required],
      url: [null],
      formato_imagem: [null, Validators.required],
      precoTotal: [null, Validators.required],
    })
  }

  upgradeProd() {
    if (!this.upgradeForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')

      return
    }

    let payload = this.upgradeForm.value
    let productId
    productId = this.upgradeForm.get('id').value

    this.apiService.updateProduct(payload, productId).subscribe(() => {
      this.service.showMessage("Produto atualizado com sucesso!", 'success')

      setTimeout(() => {
        this.route.navigate(['/adm-crud/home-product'])
      }, 600)
    },
      err => {
        this.service.showMessage("Não foi possível realizar a atualização!", 'error')
        console.log(err)
      })
  }

  onChange(event) {
    //Pega a imagem pra ser transformado em um formData
    this.imageName = event.target.files[0].name
    this.userFile = event.target.files[0]

      const filereader = new FileReader()
      filereader.readAsDataURL(this.userFile)
      filereader.onload = () => {
        this.upgradeForm.get('url').setValue(filereader.result)
      }
    this.upgradeForm.get('url').setValue(this.imageName)
  }

  //input apenas numeros
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  limparForm() {
    this.inputImg.nativeElement.value = ''
    this.imageName = "Escolha a imagem"
    this.upgradeForm.reset()
  }

}
