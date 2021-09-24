import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../components/pop-up/pop-up.component'
import { Router } from '@angular/router';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   action: string
// }

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },

];

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  displayedColumns: string[] = ['nome', 'contato', 'email', 'deposito', 'pontos', 'action'];
  // dataSource = ELEMENT_DATA;
  dataSource: any = []

  allUser: any = []
  table: any = []

  constructor(private service: ServiceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    this.getAllUsers()

    this.setTable()

  }

  getAllUsers() {
    this.service.getallUsers().subscribe(data => {
      // console.log(data)
      this.allUser = data;
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
