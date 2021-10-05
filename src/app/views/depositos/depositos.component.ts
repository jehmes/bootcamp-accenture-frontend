import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css']
})
export class DepositosComponent implements OnInit {

  allDepositos: any = []

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    this.getAllDepositos()
  }


  
  getAllDepositos() {
    //Pega a lista de depositos da base de dados
    this.service.getAllDepositos().subscribe((data) => {
      this.allDepositos = data
      //  console.log('todos depositos ', this.allDepositos)
    })
  }
}
