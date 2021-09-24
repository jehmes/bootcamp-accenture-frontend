import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   // action: string
// }

// const ELEMENT_DATA: any[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},

// ];

@Component({
  selector: 'app-deposito-home',
  templateUrl: './deposito-home.component.html',
  styleUrls: ['./deposito-home.component.css']
})

export class DepositoHomeComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  displayedColumns: string[] = ['nome', 'logradouro', 'bairro', 'cidade'];
  dataSource: any = []

  allDepositos: any = []
  table: any = []

  cadastroForm!: FormGroup;

  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getAllDepositos()

    this.preencherTabela()

  }

  getAllDepositos() {
    //Pega a lista de depositos da base de dados
    this.service.getAllDepositos().subscribe((data) => {
     let depositos = data
     //Apenas mostrar os depositos adicionados manualmente no banco
     this.allDepositos = depositos.filter((d) => {
       return d.criador === "adm"
     })
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

    console.log(this.dataSource)
  },200)
 }

 


}
