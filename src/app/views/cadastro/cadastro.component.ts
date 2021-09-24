
import { ServiceService } from '../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';
import { Router } from "@angular/router"
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  depositoModel: any

  allDepositos: any = []

  cpfValidator = false;

  emailValidator = true;

  loginFom!: FormGroup;

  cadastroForm!: FormGroup;

  constructor(private service: ServiceService, private formBuilder: FormBuilder, private route: Router, private serviceAuth: AuthService) { }

  ngOnInit(): void {

    this.createForm()

    this.getAllDepositos()

    this.disableLogin()

  }

  //Atribuir o deposito selecionado ao formulario
  setDepositoValues() {
    let d = this.depositoModel

    this.cadastroForm.get('deposito')?.get('id')?.setValue(d.id)
    this.cadastroForm.get('deposito')?.get('nome')?.setValue(d.nome)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('id')?.setValue(d.endereco.id)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('cep')?.setValue(d.endereco.cep)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('logradouro')?.setValue(d.endereco.logradouro)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('bairro')?.setValue(d.endereco.bairro)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('cidade')?.setValue(d.endereco.cidade)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('estado')?.setValue(d.endereco.estado)
    this.cadastroForm.get('deposito')?.get('endereco')?.get('numero')?.setValue(d.endereco.numero)
    //console.log('formGroup ', this.cadastroForm.get('deposito')?.value)
  }

  createUser() {
    // console.log('valiudo ',this.cadastroForm.valid)
    if (!this.cadastroForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      // console.log(this.cadastroForm.value)
      return
    }
    let payload = this.cadastroForm.value
    // console.log('payload ',payload)

    this.service.createUser(payload).subscribe(() => {
      //console.log("Usuario criado ",payload)
      this.limparForm()
      this.service.showMessage("Cadastro realizado com sucesso!", 'success')
    },
      err => {
        this.service.showMessage("Não foi possível realizar o cadastro!", 'error')
        console.log(err)
      })
  }

  loginValidate() {
    if (!this.loginFom.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      return
    }

    this.searchLogin()

  }

  searchLogin() {
    let payload = this.loginFom.value
    // console.log(payload)
    //Valida o login
    this.service.loginValidate(payload).subscribe((data) => {
      this.service.showMessage("Login realizado com sucesso", 'success')
      // console.log(data)

      this.setLoginLocalStor(data)

    },
      err => {
        if (err.status === 500)
          this.service.showMessage("Login ou senha inválidos", 'error')
        else
          this.service.showMessage("Servico offline, contatar o suporte", 'error')
        // //console.log(err)
      })
  }

  setLoginLocalStor(data) {

    let id = (data.id).toString()
    let score = (data.pontos).toString()
    let nome = data.nome

    let profileInfo = {
      id,
      nome,
      score
    }

    this.service.sendLoginLocalStorage(false, profileInfo)

    setTimeout(() => {
      this.route.navigate([''])
    }, 700)
  }

  getAllDepositos() {
    //Pega a lista de depositos da base de dados
    this.service.getAllDepositos().subscribe((data) => {
      this.allDepositos = data
      // console.log(this.allDepositos)
    })
  }


  //Caso o adm entre na tela de login/cadastro, apenas o cadastro está disponível
  disableLogin() {
    this.serviceAuth.isLoggedAdmObs().subscribe(response => {
      // console.log('resposta ', response)
      if (response === true) {
        this.loginFom.get('login').disable()
        this.loginFom.get('senha').disable()
      }

      else {
        this.loginFom.get('login').enable()
        this.loginFom.get('senha').enable()
      }
    })
  }

  createForm() {
    this.loginFom = this.formBuilder.group({
      login: [null, [Validators.required, validarCpf]],
      senha: [null, Validators.required]
    })
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: ['', [Validators.required, validarCpf]],
      senha: [null, Validators.required],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        numero: [null, Validators.required],
      }),
      deposito: this.formBuilder.group({
        nome: [null, Validators.required],
        id: [this.allDepositos.id],
        endereco: this.formBuilder.group({
          id: [null],
          cep: [null, Validators.required],
          logradouro: [null, Validators.required],
          bairro: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
          numero: [null, Validators.required],
        })
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
function validarCpf(control: AbstractControl): { [key: string]: any } | null {
  const cpfValue: string = control.value

  if (cpf.isValid(cpfValue)) {
    return null;
  } else {
    return { 'validarCPF2': true }
  }
}

