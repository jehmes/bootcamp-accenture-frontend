import { Validacoes } from './../../validations/Validators';
import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator'; 




@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  depositoModel:any 

  allDepositos: any = []

  cpfValidator = false;

  emailValidator = true;

  loginFom!: FormGroup;

  cadastroForm!: FormGroup;

  // depositos: Food[] = [
  //   {value: '1', viewValue: 'Deposito Fulano, Rua 25, Recife - PE'},
  //   {value: '2', viewValue: 'Deposito Sicrano, Rua 27, Jaboatão - PE'},
  //   {value: '3', viewValue: 'Deposito Beltrano, Rua 2 de Julho, Olinda - PE'}
  // ];

  constructor(private service: ServiceService, private formBuilder: FormBuilder) {}  

  ngOnInit(): void {
    
    this.loginFom = this.formBuilder.group({
      cpf: [null,[Validators.required, validarCpf]],
      senha: [null, Validators.required]
      })

    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: ['',[Validators.required, validarCpf]],
      senha: [null, Validators.required],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],  
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      deposito: this.formBuilder.group({
        nome: [null, Validators.required],
        endereco: this.formBuilder.group({
          cep: [null, Validators.required],
          logradouro: [null, Validators.required],
          bairro: [null, Validators.required],  
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
        })
      }),
      contato: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
      })

      
      this.service.getAllDepositos().subscribe((data) => {
        this.allDepositos = data
        console.log(this.allDepositos)
      })

    
  }
  
  setDepositoValues() {
    let d = this.depositoModel
    this.cadastroForm.get('deposito')?.get('id')?.setValue(d.id)
    this.cadastroForm.get('deposito')?.get('nome')?.setValue(d.nome)
    // this.cadastroForm.get('deposito')?.get('endereco')?.get('id')?.setValue(d.endereco.id)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('cep')?.setValue(d.endereco.cep)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('logradouro')?.setValue(d.endereco.logradouro)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('bairro')?.setValue(d.endereco.bairro)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('cidade')?.setValue(d.endereco.cidade)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('estado')?.setValue(d.endereco.estado)
    console.log('formGroup ', this.cadastroForm.get('deposito')?.value)
   }

 createUser() {

  //  if (!this.cadastroForm.valid) {
  //      this.service.showMessage("Campos inválidos!", 'error')
  //      return
  //    }
   
    //Altera de string pra int
    // this.cadastroForm.value.deposito.id = +this.cadastroForm.value.deposito.id 
    
    let payload = this.cadastroForm.value
    console.log(payload)
  
    this.service.createUser(payload).subscribe(()=>{
      console.log("Usuario criado ",payload)
      // this.limparForm()
      this.service.showMessage("Cadastro realizado com sucesso!", 'success')
    }, 
    err => {
      this.service.showMessage("Não foi possível realizar o cadastro!", 'error')
      console.log(err)
    })
 }


 loginValidate (){
    //  if (!this.loginFom.valid) {
    //    this.service.showMessage("Campos inválidos!", 'error')
    //    return
    //  }
     let payload = this.loginFom.value

     this.service.loginValidate(payload).subscribe(() => {
      this.service.showMessage("Cadastro realizado com sucesso!", 'success')
     },
     err => {
      this.service.showMessage("Não foi possível realizar o cadastro!", 'error')
      console.log(err)
     })

 }


  //Consulta o CEP numa API
  consultarCEP(cep: any) {
    if (cep.target.value.length == 8) {
     const value = cep.target.value
 
      this.service.getCEP(value).subscribe((dados) => {
        this.popularEndereco(dados)
      })
    } 
  }

   //Popula os campos endereço vindo da API
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
    console.log(charCode)
    // Only Numbers 0-9
    if ((charCode < 97 || charCode > 122)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  limparForm() {
    this.cadastroForm.reset()
    // this.cadastroForm.get("deposito")?.setValue("")
   }

   
 
    
}

//Valida CPF
function validarCpf(control: AbstractControl): {[key: string]: any} | null {
  const cpfValue: string = control.value
  
  if (cpf.isValid(cpfValue)) {
    return null;
  } else {
    return { 'validarCPF2': true}
  }
}

