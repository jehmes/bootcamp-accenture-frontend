import { Component, OnInit } from '@angular/core';
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

  constructor(private service: ServiceService, private apiService: ShopApiService, private shopService: ShopService,
    private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.createForm()

    this.product = this.shopService.getUpgProduct()

    //Verifica se existe deposito(só vai existir caso seja clicado em editar no home-deposito)
    //É para bloquear que a pagina de update seja acessada de qualquer lugar
    if (this.product !== undefined) {
      console.log(this.product)
      this.upgradeForm.setValue(this.product[0])

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
      precoTotal: [null, Validators.required],
    })
  }

  upgradeProd() {
    // console.log(this.upgradeForm.value)
    // console.log(this.cadastroForm.value)
    if (!this.upgradeForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      console.log(this.upgradeForm.value)
      return
    }

    let payload = this.upgradeForm.value
    let productId
    productId = this.upgradeForm.get('id').value
    console.log('productId ',productId)

    this.apiService.updateProduct(payload, productId).subscribe(() => {
      this.limparForm()
      this.service.showMessage("Produto atualizado com sucesso!", 'success')
      this.route.navigate(['/adm-crud/home-product'])
    },
      err => {
        this.service.showMessage("Não foi possível realizar a atualização!", 'error')
        console.log(err)
      })
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
    this.upgradeForm.reset()
  }

}