
import { ServiceService } from './../../service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator'; 
import { Router } from "@angular/router"



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

  constructor(private service: ServiceService, private formBuilder: FormBuilder, private route: Router) {}  

  ngOnInit(): void {
    
    this.loginFom = this.formBuilder.group({
      login: [null,[Validators.required, validarCpf]],
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

      //Pega a lista de depositos da base de dados
      this.service.getAllDepositos().subscribe((data) => {
        let depositos = data
        //Apenas mostrar os depositos adicionados manualmente no banco
        this.allDepositos = depositos.slice(0, 3)
        // //console.log(this.allDepositos)
      })
     
    
  }
  //Atribuir o deposito selecionado ao formulario
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
    //console.log('formGroup ', this.cadastroForm.get('deposito')?.value)
   }

 createUser() {

   if (!this.cadastroForm.valid) {
       this.service.showMessage("Campos inválidos!", 'error')
       return
     }
    
    let payload = this.cadastroForm.value
    //console.log(payload)
  
    this.service.createUser(payload).subscribe(()=>{
      //console.log("Usuario criado ",payload)
      this.limparForm()
      this.service.showMessage("Cadastro realizado com sucesso!", 'success')
    }, 
    err => {
      this.service.showMessage("Não foi possível realizar o cadastro!", 'error')
      console.log(err)
    })
 }


 loginValidate (){
     if (!this.loginFom.valid) {
       this.service.showMessage("Campos inválidos!", 'error')
       return
     }

     let payload = this.loginFom.value

     //Valida o login
     this.service.loginValidate(payload).subscribe((data) => {
      this.service.showMessage("Login realizado com sucesso", 'success')
      // //console.log(data)
      let id = (data.id).toString()
      let points = (data.pontos).toString()

      //Armazena algumas info pro profile Header
      localStorage.setItem("id", id)
      localStorage.setItem("points", points)
      localStorage.setItem("login", data.nome)

      setTimeout(() => {
        this.route.navigate([''])
      },700)
        
     },
     err => {
      this.service.showMessage("Login ou senha inválidos", 'error')
      console.log(err)
      // //console.log(err)
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
    this.depositoModel = null;
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

