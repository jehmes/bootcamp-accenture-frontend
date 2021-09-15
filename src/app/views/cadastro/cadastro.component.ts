import { User } from './../../User.model';
import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';


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
    contato: ''
  }
 
  
  depositos: Food[] = [
    {value: '1', viewValue: 'Deposito Fulano, Rua 25, Recife - PE'},
    {value: '2', viewValue: 'Deposito Sicrano, Rua 27, Jaboatão - PE'},
    {value: '3', viewValue: 'Deposito Beltrano, Rua 2 de Julho, Olinda - PE'}
  ];

  constructor(private service: ServiceService) { 
    
  }  

 consultarCEP(cep: any) {
   if (cep.target.value.length == 8) {
    const value = cep.target.value

     this.service.getCEP(value).subscribe((dados) => {
       this.popularForm(dados)
     })
   }
  
   
 }

 popularForm(dados: any) {
    this.user.endereco.logradouro = dados.logradouro
    this.user.endereco.bairro = dados.bairro
    this.user.endereco.cidade = dados.localidade
    this.user.endereco.estado = dados.uf 
 }


 createUser() {
   this.service.createUser(this.user).subscribe(()=>{
     console.log("Usuario criado ",this.user)
     this.limparForm()
   }, ()=> {
     console.log("Algo deu errado")
   })
 }

 limparForm() {
  this.user  = {
    nome: '',
    cpf: '',
    senha: '',
    contato: '',
    endereco: {
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    deposito: {
      id: 0
    }
  }
 }

  ngOnInit(): void {}

  
}
