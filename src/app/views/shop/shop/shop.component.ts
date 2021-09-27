import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service'

export interface Product {
  id: number
  nome: string,
  preco: number,
  descricao: string,
  url: string,
  precoTotal: number
}


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})



export class ShopComponent implements OnInit {

  produtos: Product[] = [{
    id: 1,
    nome: "Bolsa",
    preco: 2.00,
    precoTotal: 2.00,
    descricao: "bolsa para carregar objetos.",
    url: "../../../../assets/img-cart/bolsa-branca-reci.jpg"
  }, {
    id: 2,
    nome: "Caneta",
    preco: 1.50,
    precoTotal: 1.50,
    descricao: "Caneta feita a partir de material reciclado",
    url: "../../../../assets/img-cart/caneta-bic-azul.jpg"
  }, {
    id: 3,
    nome: "Camisa",
    preco: 25.90,
    precoTotal: 25.90,
    descricao: "Camisa com a logo",
    url: "../../../../assets/img-cart/camisa-nike-dri-fit-uniformes-infantil-725984-010-2.jpg"
  }]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
  }


  addCart(item) {
    console.log('SHOP 1',item)
    this.shopService.increaseCart(item, "inc")
  }
}
