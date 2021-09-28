import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ShopService } from '../../../services/shop.service'
import { ShopApiService } from '../../../services/shop-api.service'

// export interface Product {
//   id: number
//   nome: string,
//   preco: number,
//   descricao: string,
//   url: string,
//   precoTotal: number
// }


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})



export class ShopComponent implements OnInit {

  Allproducts: any[] = []

  loginAdm: string
  
  isAdmLog: boolean = false

  // produtos: Product[] = [{
  //   id: 1,
  //   nome: "Bolsa",
  //   preco: 2,
  //   precoTotal: 2,
  //   descricao: "bolsa para carregar objetos.",
  //   url: "../../../../assets/img-cart/bolsa-branca-reci.jpg"
  // }, {
  //   id: 2,
  //   nome: "Caneta",
  //   preco: 1,
  //   precoTotal: 1,
  //   descricao: "Caneta feita a partir de material reciclado",
  //   url: "../../../../assets/img-cart/caneta-bic-azul.jpg"
  // }, {
  //   id: 3,
  //   nome: "Camisa",
  //   preco: 25,
  //   precoTotal: 25,
  //   descricao: "Camisa com a logo",
  //   url: "../../../../assets/img-cart/camisa-nike-dri-fit-uniformes-infantil-725984-010-2.jpg"
  // }]

  constructor(private shopService: ShopService, private service: ServiceService, private shopApiService: ShopApiService) { }

  ngOnInit(): void {
    
    this.getAllProducts()

    this.admLoged()
  }


  addCart(item) {
    // console.log('SHOP 1',item)
    this.shopService.increaseCart(item, "inc")
    this.service.showMessage("Produto Adicionado!", 'success')
  }

  
  admLoged() {
    this.service.getLocalStorage().subscribe((data) => {
      
      this.loginAdm = data.loginAdm
      
      this.loginAdm != null ? this.isAdmLog = true : this.isAdmLog = false 
      
    })
  }

  getAllProducts() {
    this.shopApiService.getAllProducts().subscribe((products) => {
      this.Allproducts = products
    })
    setTimeout(()=> {
      console.log('products ', this.Allproducts)
    },200)
  }
  

}
