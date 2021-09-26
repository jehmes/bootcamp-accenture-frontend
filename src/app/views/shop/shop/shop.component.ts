import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  produtos = [{
    nome: "Caneta",
    preco: "2,00",
    descricao: "Caneta feita a partir de material reciclado"
  }, {
    nome: "bolsa",
    preco: "30,00",
    descricao: "bolsa para carregar objetos."
  }]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
  }


  addCart(e) {
    console.log(e)
    this.shopService.increaseCart({nome: "teste", preco: "2.00"})
  }
}
