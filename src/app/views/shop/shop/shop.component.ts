import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { ShopService } from '../../../services/shop.service'
import { ShopApiService } from '../../../services/shop-api.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})



export class ShopComponent implements OnInit {

  Allproducts: any[] = []

  loginAdm: string

  isAdmLog: boolean = false

  idLogin: any

  isUserLog: boolean = false

  path = "../../../../assets/img-cart/"

  constructor(private shopService: ShopService, private service: ServiceService, private shopApiService: ShopApiService, private router: Router) { }

  ngOnInit(): void {

    this.getAllProducts()

    this.admLoged()

    this.isUserLogFunct()
  }


  addCart(item) {
    if (!this.isUserLog) {
      this.service.showMessage("Efetue o login", 'error')
      this.router.navigate(['/cadastro'])
      return
    }
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
    setTimeout(() => {
      console.log('products ', this.Allproducts)
    }, 200)
  }

  isUserLogFunct() {

    this.service.getLocalStorage().subscribe((data) => {

      this.idLogin = data.id

      this.idLogin >= 0 ? this.isUserLog = true : this.isUserLog = false
      // console.log(this.showAdm)
    })
  }


}
