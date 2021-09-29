import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-deposito-update',
  templateUrl: './deposito-update.component.html',
  styleUrls: ['./deposito-update.component.css']
})
export class DepositoUpdateComponent implements OnInit {

  deposito: any

  upgradeForm!: FormGroup;


  constructor(private service: ServiceService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.createForm()

    this.deposito = this.service.getUpgDeposito()

    //Verifica se existe deposito(só vai existir caso seja clicado em editar no home-deposito)
    //É para bloquear que a pagina de update seja acessada de qualquer lugar
    if (this.deposito !== undefined) {
      this.upgradeForm.setValue(this.deposito[0])

    } else {
      this.route.navigate(['/adm-crud/home-deposito'])
    }

  }

  createForm() {
    this.upgradeForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      endereco: this.formBuilder.group({
        id: [null],
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        numero: [null, Validators.required],
      })
    })
  }

  upgradeProd() {
    // console.log(this.upgradeForm.value)
    // console.log(this.cadastroForm.value)
    if (!this.upgradeForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      console.log(this.upgradeForm.value)
      return
    }

    let payload = this.upgradeForm.value

    this.service.createDeposito(payload).subscribe(() => {
      this.limparForm()
      this.service.showMessage("Deposito criado com sucesso!", 'success')
      this.route.navigate(['/adm-crud/home-deposito'])
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
    this.upgradeForm.get('endereco')?.get('logradouro')?.setValue(dados.logradouro)
    this.upgradeForm.get('endereco')?.get('bairro')?.setValue(dados.bairro)
    this.upgradeForm.get('endereco')?.get('cidade')?.setValue(dados.localidade)
    this.upgradeForm.get('endereco')?.get('estado')?.setValue(dados.uf)
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
    this.upgradeForm.reset()
  }

}
