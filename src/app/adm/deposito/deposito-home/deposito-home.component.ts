import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-deposito-home',
  templateUrl: './deposito-home.component.html',
  styleUrls: ['./deposito-home.component.css']
})

export class DepositoHomeComponent implements OnInit {


  displayedColumns: string[] = ['nome', 'logradouro', 'bairro', 'cidade'];
  dataSource: any = []

  allDepositos: any = []
  table: any = []

  cadastroForm!: FormGroup;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    this.getAllDepositos()

    this.preencherTabela()

  }

  getAllDepositos() {
    //Pega a lista de depositos da base de dados
    this.service.getAllDepositos().subscribe((data) => {
      this.allDepositos = data
      //  console.log('todos depositos ', this.allDepositos)
    })
  }

  preencherTabela() {
    setTimeout(() => {
      this.allDepositos.forEach(d => {
        // console.log('teste 1232312',d)
        this.table.push(
          {
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


}
