import { Validacoes } from './../../validations/Validators';
import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator'; 


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cpfValidator = false;

  emailValidator = true;

  userForm!: FormGroup;

  depositos: Food[] = [
    {value: '1', viewValue: 'Deposito Fulano, Rua 25, Recife - PE'},
    {value: '2', viewValue: 'Deposito Sicrano, Rua 27, Jaboatão - PE'},
    {value: '3', viewValue: 'Deposito Beltrano, Rua 2 de Julho, Olinda - PE'}
  ];

  constructor(private service: ServiceService, private formBuilder: FormBuilder) {}  

  ngOnInit(): void {
    

    this.userForm = this.formBuilder.group({
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
        id: [null, Validators.required]
      }),
      contato: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
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
   this.userForm.get('endereco')?.get('logradouro')?.setValue(dados.logradouro)
   this.userForm.get('endereco')?.get('bairro')?.setValue(dados.bairro)
   this.userForm.get('endereco')?.get('cidade')?.setValue(dados.localidade)
   this.userForm.get('endereco')?.get('estado')?.setValue(dados.uf)
 }



 createUser() {

  //  if (!this.userForm.valid) {
  //      this.service.showMessage("Campos inválidos!", 'error')
  //      return
  //    }
   
    //Altera de string pra int
    this.userForm.value.deposito.id = +this.userForm.value.deposito.id 
    
    let payload = this.userForm.value

    this.service.createUser(payload).subscribe(()=>{
      console.log("Usuario criado ",payload)
      this.limparForm()
      this.service.showMessage("Cadastro realizado com sucesso!", 'success')
    }, 
    err => {
      this.service.showMessage("Não foi possível realizar o cadastro!", 'error')
      console.log(err)
    }
    )
 }


 limparForm() {
  this.userForm.reset()
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

    
}


function validarCpf(control: AbstractControl): {[key: string]: any} | null {
  const cpfValue: string = control.value
  
  if (cpf.isValid(cpfValue)) {
    return null;
  } else {
    return { 'validarCPF2': true}
  }
}