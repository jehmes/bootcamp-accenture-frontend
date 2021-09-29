import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-deposito-home',
  templateUrl: './deposito-home.component.html',
  styleUrls: ['./deposito-home.component.css']
})

export class DepositoHomeComponent implements OnInit {


  displayedColumns: string[] = ['nome', 'logradouro', 'bairro', 'cidade', 'action'];
  dataSource: any = []

  allDepositos: any = []

  table: any = []

  total: number

  deposito: any = {}

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    this.getAllDepositos()

    this.preencherTabela()

  }

  getAllDepositos() {
    //Pega a lista de depositos da base de dados
    this.service.getAllDepositos().subscribe((data) => {
      this.allDepositos = data
      this.total = data.length
      //  console.log('todos depositos ', this.allDepositos)
    })
  }

  preencherTabela() {
    setTimeout(() => {
      this.allDepositos.forEach(d => {
        // console.log('teste 1232312',d)
        this.table.push(
          {
            id: d.id,
            nome: d.nome,
            logradouro: `${d.endereco.logradouro}, ${d.endereco.numero}`,
            bairro: d.endereco.bairro,
            cidade: d.endereco.cidade
          }
        )
      });

      this.dataSource = this.table
    }, 200)
  }

  sendData(e) {
    let deposito: any = {}
    deposito = this.allDepositos.filter((dep) => {
      return dep.id === e.id
    })
    this.service.sendUpgDeposito(deposito)
    // console.log('informaçao ', deposito)
  }

}
