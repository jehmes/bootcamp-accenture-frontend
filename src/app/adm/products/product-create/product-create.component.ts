import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { ShopApiService } from 'src/app/services/shop-api.service'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  cadastroForm!: FormGroup;

  imageName = "Escolha a imagem"

  userFile: any = File

  
  @ViewChild('inputImg') inputImg: ElementRef
  
  constructor(private service: ServiceService, private formBuilder: FormBuilder, private shopApiService: ShopApiService) { }

  ngOnInit(): void {

    this.createForm()
  }


  createProduct() {
    if (!this.cadastroForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      return
    }
    
    const formData = new FormData()
    formData.append('file', this.userFile)

    const product = this.cadastroForm.value
    this.shopApiService.createProduct(product).subscribe(data => {
      this.limparForm()
      this.service.showMessage("Produdo criado com sucesso!", 'success')
    }, err => {
      console.log(err)
      this.service.showMessage("Não foi possível realizar o cadastro do produto!", 'error')
    })
  }

  createForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      preco: [null, Validators.required],
      url: [null, Validators.required],
      formato_imagem: [null, Validators.required]
    })
  }

  onChange(event) {
    //Pega a imagem pra ser transformado em um formData
    this.imageName = event.target.files[0].name
    this.cadastroForm.get('formato_imagem').setValue(this.imageName)
    this.userFile = event.target.files[0]

      const filereader = new FileReader()
      filereader.readAsDataURL(this.userFile)
      filereader.onload = () => {
        this.cadastroForm.get('url').setValue(filereader.result)
      }
    this.cadastroForm.get('url').setValue(this.imageName)
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
    this.cadastroForm.reset()
  }
}