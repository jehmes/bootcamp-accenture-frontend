import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { ServiceService } from 'src/app/services/service.service';

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
  constructor(private service: ServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: ['',[Validators.required, validarCpf]],
      senha: [null, Validators.required],
      pontos: [null],
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

      //Pegar todos depositos da base da dados
      this.service.getAllDepositos().subscribe((data) => {
        // this.allDepositos = data
        let depositos = data
        //Apenas mostrar os depositos adicionados manualmente no banco
        this.allDepositos = depositos.slice(0, 3)
        
      })
      
      //Pegar o id do usuario logado
      this.service.getLocalStorage().subscribe((data) => {
        this.service.getUserById(data.id).subscribe(dados => {
          this.popularForm(dados)
          this.idLogin = data.id
        })
      })
      //console.log(this.idLogin)
     

  }

  popularForm(dados: any) {
    this.updateForm.get('pontos').setValue(dados.pontos)
    //Popula o endereço
    delete dados.endereco['id']
    this.updateForm.get('endereco').setValue(dados.endereco)

    //Seleciona o deposito no select
    this.setDepositoSelect(dados)
    // console.log(dados)
      //Popula dados pessoais do usuario
      this.updateForm.get('nome').setValue(dados.nome)
      this.updateForm.get('cpf').setValue(dados.cpf)
      this.updateForm.get('senha').setValue(dados.senha)
      this.updateForm.get('contato').setValue(dados.contato)
      this.updateForm.get('email').setValue(dados.email)
      //console.log(dados)
    }

    setDepositoSelect(dados: any) {
      setTimeout(() => {
        let depositoSelec: any  
        this.depositoModel= this.allDepositos.filter((deposito) => {
          // console.log(deposito)
          // console.log('aqui ',dados)
          if (dados.deposito.nome === deposito.nome)
            depositoSelec = deposito
            // console.log(depositoSelec)
        })
          this.depositoModel = depositoSelec
      }, 300)
    }

    setDepositoValues() {
      let d = this.depositoModel
      // //console.log(d)
      this.updateForm.get('deposito')?.get('id')?.setValue(d.id)
      // console.log('deposito nome ',this.updateForm.get('deposito')?.get('nome')?.setValue(d.nome))
      this.updateForm.get('deposito')?.get('nome')?.setValue(d.nome)
      // this.cadastroForm.get('deposito')?.get('endereco')?.get('id')?.setValue(d.endereco.id)
      this.updateForm.get('deposito')?.get('endereco')?.get('cep')?.setValue(d.endereco.cep)
      this.updateForm.get('deposito')?.get('endereco')?.get('logradouro')?.setValue(d.endereco.logradouro)
      this.updateForm.get('deposito')?.get('endereco')?.get('bairro')?.setValue(d.endereco.bairro)
      this.updateForm.get('deposito')?.get('endereco')?.get('cidade')?.setValue(d.endereco.cidade)
      this.updateForm.get('deposito')?.get('endereco')?.get('estado')?.setValue(d.endereco.estado)
      // //console.log('formGroup ', this.updateForm.get('deposito')?.value)
    }

   updateUser() {
    //  console.log( this.updateForm.value)
     //Atribuir o deposito selecionado ao formulario
    this.setDepositoValues()
    let payload = this.updateForm.value
    //console.log(payload)
    this.service.updateUser(payload, this.idLogin).subscribe((data) => {
      localStorage.clear()

      let id = (data.id).toString()
      let score = (data.pontos).toString()
      let nome = data.nome

      let profileInfo = {
        id,
        nome,
        score
      }
      this.service.sendLoginLocalStorage(false, profileInfo)

      //console.log("Usuario atualizado ",payload)
      this.service.showMessage("Usuario atualizado com sucesso!", 'success')
      setTimeout(() => {
        this.router.navigate([''])
      },600)
    }, 
    err => {
      this.service.showMessage("Não foi possível atualizar o usuario!", 'error')
      //console.log(err)
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
  //console.log(charCode)
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
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