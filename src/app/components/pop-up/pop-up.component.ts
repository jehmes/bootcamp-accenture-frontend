import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {


  id
  nome
  contato
  email
  cpf
  deposito
  pontos
  bairro
  cep
  cidade
  estado
  logradouro
  numero


  constructor(@Inject(MAT_DIALOG_DATA) public data, private service: ServiceService) {
    // console.log('popup', data)
    this.id = data.id
    this.nome = data.nome
    this.contato = data.contato
    this.email = data.email
    this.cpf = data.cpf
    this.deposito = data.deposito
    this.pontos = data.pontos
    this.bairro = data.endereco.bairro
    this.cep = data.endereco.cep
    this.cidade = data.endereco.cidade
    this.estado = data.endereco.estado
    this.logradouro = data.endereco.logradouro
    this.numero = data.endereco.numero

  }

  ngOnInit(): void {

  }


  confirmDelete() {
    console.log(this.id)
    this.service.deleteUser(this.id).subscribe((data) => {

      this.service.showMessage("Cadastro excluído com sucesso!", 'success')
      setTimeout(() => {
        window.location.reload();
      }, 1000)

    }, err => {
      this.service.showMessage("Não foi possível excluir o cadastro!", 'error')
      console.log(err)
    })
  }


}
