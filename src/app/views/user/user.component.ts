import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '../../components/popup-confirm/popup-confirm.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData: any

  idLogin: number

  depositos: any

  depositoModel: any

  allDepositos: any

  updateForm!: FormGroup;

  constructor(private service: ServiceService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.createForm()

    this.getAllDepositos()

    this.getUserLocalStor()

  }

  popularForm(dados: any) {

    this.updateForm.get('endereco').setValue(dados.endereco)

    //Seleciona o deposito no select
    this.setDepositoSelect(dados)

    this.updateForm.setValue(dados)

  }

  setDepositoSelect(dados: any) {
    setTimeout(() => {
      let depositoSelec: any
      this.depositoModel = this.allDepositos.filter((deposito) => {
        // console.log(deposito)
        if (dados.deposito.nome === deposito.nome)
          depositoSelec = deposito
        // console.log(depositoSelec)
      })
      this.depositoModel = depositoSelec
    }, 300)

  }

  setDepositoValues() {
    let d = this.depositoModel

    this.updateForm.get('deposito')?.get('id')?.setValue(d.id)
    this.updateForm.get('deposito')?.get('nome')?.setValue(d.nome)
    this.updateForm.get('deposito')?.get('url')?.setValue(d.url)
    this.updateForm.get('deposito')?.get('formato_imagem')?.setValue(d.formato_imagem)
    this.updateForm.get('deposito')?.get('tipoMaterial')?.setValue(d.tipoMaterial)
    this.updateForm.get('deposito')?.get('endereco')?.get('id')?.setValue(d.endereco.id)
    this.updateForm.get('deposito')?.get('endereco')?.get('cep')?.setValue(d.endereco.cep)
    this.updateForm.get('deposito')?.get('endereco')?.get('logradouro')?.setValue(d.endereco.logradouro)
    this.updateForm.get('deposito')?.get('endereco')?.get('bairro')?.setValue(d.endereco.bairro)
    this.updateForm.get('deposito')?.get('endereco')?.get('cidade')?.setValue(d.endereco.cidade)
    this.updateForm.get('deposito')?.get('endereco')?.get('estado')?.setValue(d.endereco.estado)
    this.updateForm.get('deposito')?.get('endereco')?.get('numero')?.setValue(d.endereco.numero)

    // console.log(this.updateForm.value)
  }

  updateUser() {
    //Atribuir o deposito selecionado ao formulario
    let payload = this.updateForm.value
    // console.log(payload)
    this.service.updateUser(payload, this.idLogin).subscribe((data) => {
      // localStorage.clear()
      localStorage.removeItem('id')
      localStorage.removeItem('login')
      localStorage.removeItem('points')

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
      }, 600)
    },
      err => {
        if (err.error.message === undefined) {
          console.log(err.error.message)
          this.service.showMessage("Não foi possível atualizar o usuario!", 'error')
          console.log(err)
          return
        }
        this.service.showMessage(err.error.message, 'error')
      })
  }

  getUserLocalStor() {
    //Pega o id do usuario logado e popula o form
    this.service.getLocalStorage().subscribe((data) => {
      this.service.getUserById(data.id).subscribe(dados => {
        this.popularForm(dados)
        this.idLogin = data.id
        // this.userData = data
        // console.log('dados ', dados)
      })
    })
    //console.log(this.idLogin)
  }

  getAllDepositos() {
    //Pegar todos depositos da base da dados
    this.service.getAllDepositos().subscribe((data) => {
      this.allDepositos = data
    })
  }

  openConfirm(e) {
    e.preventDefault()
    this.dialog.open(PopupConfirmComponent, {
      data: {
        userId: this.idLogin
      }
    })
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      cpf: ['', [Validators.required, validarCpf]],
      senha: [null, Validators.required],
      pontos: [null],
      endereco: this.formBuilder.group({
        id: [null],
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        numero: [null, Validators.required],
      }),
      deposito: this.formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        url: [null, Validators.required],
        formato_imagem: [null, Validators.required],
        tipoMaterial: [null, Validators.required],
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
function validarCpf(control: AbstractControl): { [key: string]: any } | null {
  const cpfValue: string = control.value

  if (cpf.isValid(cpfValue)) {
    return null;
  } else {
    return { 'validarCPF2': true }
  }
}