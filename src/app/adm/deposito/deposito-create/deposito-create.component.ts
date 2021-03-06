import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-deposito-create',
  templateUrl: './deposito-create.component.html',
  styleUrls: ['./deposito-create.component.css']
})
export class DepositoCreateComponent implements OnInit {

  cadastroForm!: FormGroup;
  
  imageName = "Escolha a imagem"

  userFile: any = File

  tipoMaterial = ['Vidro', 'Plástico', 'Papel', 'Metal', 'Tecnológico', 'Todos']

  tipoMaterialModel

  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createForm()

  }

  createDeposito() {
    // console.log(this.cadastroForm.value)
    if (!this.cadastroForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      // console.log(this.cadastroForm.value)
      return
    }

    // console.log(this.cadastroForm.value)

    let payload = this.cadastroForm.value

    this.service.createDeposito(payload).subscribe(() => {
      this.limparForm()
      this.service.showMessage("Cadastro realizado com sucesso!", 'success')
    },
      err => {
        this.service.showMessage("Não foi possível realizar o cadastro!", 'error')
        console.log(err)
      })
  }

  createForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      url: [null, Validators.required],
      formato_imagem: [null, Validators.required],
      tipoMaterial: [null, Validators.required],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        numero: [null, Validators.required],
      })

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
      // console.log('file ',filereader.result)
    }
    // console.log('payload ', this.cadastroForm.value)
    // this.cadastroForm.get('url').setValue(this.imageName)
  }

  consultarCEP(cep: any) {
    if (cep.target.value.length == 8) {
      const value = cep.target.value

      this.service.getCEP(value).subscribe((dados) => {
        this.popularEndereco(dados)
      })
    }
  }

  popularEndereco(dados: any) {
    this.cadastroForm.get('endereco')?.get('logradouro')?.setValue(dados.logradouro)
    this.cadastroForm.get('endereco')?.get('bairro')?.setValue(dados.bairro)
    this.cadastroForm.get('endereco')?.get('cidade')?.setValue(dados.localidade)
    this.cadastroForm.get('endereco')?.get('estado')?.setValue(dados.uf)
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

  //input apenas letras
  keyPressLetters(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // //console.log(charCode)
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  limparForm() {
    this.cadastroForm.reset()
    this.imageName = "Escolha a imagem"
    // this.cadastroForm.get("deposito")?.setValue("")
  }
}
