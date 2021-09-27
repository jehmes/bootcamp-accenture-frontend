import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  count = 0

  currentCart: any[] = []

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

    this.listItems()
   
  }

  incItem(item) {
    // item.product.quant += 1
    // console.log('item cru', item)
    // location.reload()
    // console.log('item  ', product)
    this.shopService.increaseCart(item.product, "inc")
  }

  decItem(item) {
    // item.product.quant += 1
    // console.log('item cru', item)
    // location.reload()
    // console.log('item  ', product)
    this.shopService.decreaseCart(item.product, "dec")
  }

  removeItem(id) {
    this.shopService.removeItem(id)
    this.listItems()
  }

  listItems() {
    this.currentCart = this.shopService.getCartLocalStor()
    this.currentCart.sort((item1, item2) => {
      // console.log('STORE ', this.currentCart)
      return item1.product.id - item2.product.id
    })
  }
}
