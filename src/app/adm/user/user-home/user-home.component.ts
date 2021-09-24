import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../components/pop-up/pop-up.component'
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'contato', 'email', 'deposito', 'pontos', 'action'];

  dataSource: any = []

  allUser: any = []
  
  table: any = []

  total: number

  constructor(private service: ServiceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    this.getAllUsers()

    this.setTable()

  }

  getAllUsers() {
    this.service.getallUsers().subscribe(data => {
      // console.log(data)
      this.allUser = data;
      this.total = data.length
    })
  }

  setTable() {
    setTimeout(() => {
      this.dataSource = this.allUser;
    }, 200)
  }

  openDialog(e: any) {
    // console.log(e)
    this.dialog.open(PopUpComponent, {
      data: {
        id: e.id,
        nome: e.nome,
        contato: e.contato,
        email: e.email,
        cpf: e.cpf,
        pontos: e.pontos,
        deposito: e.deposito.nome,
        endereco: {
          bairro: e.endereco.bairro,
          cep: e.endereco.cep,
          cidade: e.endereco.cidade,
          estado: e.endereco.estado,
          logradouro: e.endereco.logradouro,
          numero: e.endereco.numero
        }
      }
    })
  }


}
