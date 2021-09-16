import { User } from './../../User.model';
import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  
  emailValidator = true;

  user: User = {
    nome: '',
    cpf: '',
    senha: '',
    endereco: {
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    deposito: {
      id: 0
    },
    contato: '',
    email: ''
  }

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
    cpf: [null, Validators.required],
    senha: [null, Validators.required],
    cep: [null, Validators.required],
    logradouro: [null, Validators.required],
    bairro: [null, Validators.required],
    cidade: [null, Validators.required],
    estado: [null, Validators.required],
    id_deposito: [null, Validators.required],
    contato: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
    })
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
   this.userForm.get('logradouro')?.setValue(dados.logradouro)
   this.userForm.get('bairro')?.setValue(dados.bairro)
   this.userForm.get('cidade')?.setValue(dados.localidade)
   this.userForm.get('estado')?.setValue(dados.uf)
 }

 popularForm() {
    this.user.endereco.cep = this.userForm.get('cep')?.value
    this.user.endereco.logradouro = this.userForm.get('logradouro')?.value
    this.user.endereco.bairro = this.userForm.get('bairro')?.value
    this.user.endereco.cidade = this.userForm.get('cidade')?.value
    this.user.endereco.estado = this.userForm.get('estado')?.value
    this.user.nome = this.userForm.get('nome')?.value
    this.user.cpf = this.userForm.get('cpf')?.value
    this.user.senha = this.userForm.get('senha')?.value
    this.user.deposito.id = parseInt(this.userForm.get('id_deposito')?.value)
    this.user.contato = this.userForm.get('contato')?.value
    this.user.email = this.userForm.get('email')?.value
 }

 createUser() {
    if (!this.userForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      return
    }
    this.popularForm()
    this.service.createUser(this.user).subscribe(()=>{
      console.log("Usuario criado ",this.user)
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

 emailFormat(){
  if (this.userForm.get('email')?.status == "INVALID") {
    console.log('falso')
    this.emailValidator = false
  } else {
    this.emailValidator = true
  }
 }

  
}
