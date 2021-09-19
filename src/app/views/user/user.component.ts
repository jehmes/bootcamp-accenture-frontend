import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  idLogin: number

  depositos: any

  depositoModel: any

  allDepositos: any

  updateForm!: FormGroup;
  constructor(private service: ServiceService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
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

      //Pegar todos depositos
      this.service.getAllDepositos().subscribe((data) => {
        this.allDepositos = data
        console.log(this.allDepositos)
      })
      
      //Pegar o id do usuario logado
      this.idLogin = JSON.parse(localStorage.getItem('id') || '{}');
      console.log(this.idLogin)
      this.service.getUserById(this.idLogin).subscribe(dados => {
        this.popularForm(dados)
      })

  }

  popularForm(dados: any) {
    //Popula o endereço
    delete dados.endereco['id']
    this.updateForm.get('endereco').setValue(dados.endereco)

    //Pre-seleciona o deposito de acordo com o usuario
    let depositoSelec: any  
    this.depositoModel= this.allDepositos.filter((deposito) => {
      if (dados.deposito.id === deposito.id)
        depositoSelec = deposito
    })
      this.depositoModel = depositoSelec
      console.log(this.depositoModel)

      console.log(depositoSelec)

      //Popula dados pessoais do usuario
      this.updateForm.get('nome').setValue(dados.nome)
      this.updateForm.get('cpf').setValue(dados.cpf)
      this.updateForm.get('senha').setValue(dados.senha)
      this.updateForm.get('contato').setValue(dados.contato)
      this.updateForm.get('email').setValue(dados.email)
      console.log(dados)
    }

  setDepositoValues() {
    let d = this.depositoModel
    // console.log(d)
    this.updateForm.get('deposito')?.get('id')?.setValue(d.id)
    console.log(this.updateForm.get('deposito')?.get('nome')?.setValue(d.nome))
    // this.cadastroForm.get('deposito')?.get('endereco')?.get('id')?.setValue(d.endereco.id)
    this.updateForm.get('deposito')?.get('endereco')?.get('cep')?.setValue(d.endereco.cep)
    this.updateForm.get('deposito')?.get('endereco')?.get('logradouro')?.setValue(d.endereco.logradouro)
    this.updateForm.get('deposito')?.get('endereco')?.get('bairro')?.setValue(d.endereco.bairro)
    this.updateForm.get('deposito')?.get('endereco')?.get('cidade')?.setValue(d.endereco.cidade)
    this.updateForm.get('deposito')?.get('endereco')?.get('estado')?.setValue(d.endereco.estado)
    // console.log('formGroup ', this.updateForm.get('deposito')?.value)
   }

   updateUser() {
    this.setDepositoValues()
    let payload = this.updateForm.value
    console.log(payload)
    this.service.updateUser(payload, this.idLogin).subscribe((data) => {
      localStorage.clear()
      let id = (data.id).toString()
      localStorage.setItem("id", id)
      console.log("Usuario atualizado ",payload)
      this.service.showMessage("Usuario atualizado com sucesso!", 'success')
    }, 
    err => {
      this.service.showMessage("Não foi possível atualizar o usuario!", 'error')
      console.log(err)
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

   //Popula os campos endereço vindo da API
 popularEndereco(dados: any) {
  this.updateForm.get('endereco')?.get('logradouro')?.setValue(dados.logradouro)
  this.updateForm.get('endereco')?.get('bairro')?.setValue(dados.bairro)
  this.updateForm.get('endereco')?.get('cidade')?.setValue(dados.localidade)
  this.updateForm.get('endereco')?.get('estado')?.setValue(dados.uf)
}

  updateIdLocalStorage() {
    
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
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

limparForm() {
  this.updateForm.reset()
  // this.updateForm.get("deposito")?.setValue("")
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