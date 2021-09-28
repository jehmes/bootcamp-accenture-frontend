import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service'
import { ServiceService } from '../../../services/service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  count = 0

  currentCart: any[] = []

  totalValue: number = 0

  idLogin

  score

  constructor(private shopService: ShopService, private accountService: ServiceService, private route: Router) { }

  ngOnInit(): void {

    this.listItems()

    this.sumTotalValue()

  }

  incItem(item) {
    this.totalValue = 0
    this.shopService.increaseCart(item.product, "inc")
    this.sumTotalValue()
  }

  decItem(item) {
    this.totalValue = 0
    this.shopService.decreaseCart(item.product, "dec")
    this.sumTotalValue()
  }

  removeItem(id) {
    this.totalValue = 0
    this.shopService.removeItem(id)
    this.listItems()
    this.sumTotalValue()
  }

  listItems() {
    this.currentCart = this.shopService.getCartLocalStor()
    this.currentCart.sort((item1, item2) => {
      // console.log('STORE ', this.currentCart)
      return item1.product.id - item2.product.id
    })
  }

  sumTotalValue() {
    this.totalValue = 0
    this.currentCart.forEach((item) => {
      this.totalValue += item.product.precoTotal
    })
  }

  confirm() {
    this. getCountStore()
    console.log('userId ',this.idLogin)
    if (this.score < this.totalValue) {
      this.accountService.showMessage("Pontos insuficientes!", 'error')
      return
    }

    this.shopService.discountScore(this.idLogin, this.totalValue).subscribe((user) => {
      this.accountService.showMessage("Compra realizada com sucesso!", 'success')

      this.updateUserScoreLocalStor(user.pontos)
      setTimeout(() => {
        this.route.navigate(['/shop'])
      },600)

      console.log('user ', user)
    })
  }

  getCountStore() {
    this.accountService.getLocalStorage().subscribe(data => {
      console.log('id login ', data.id)

      this.idLogin = data.id
      this.score = data.score

    })
  }

  updateUserScoreLocalStor(score) {
    localStorage.removeItem('cart')
    localStorage.removeItem('points')
    localStorage.setItem("points", score)
  }
  

}
