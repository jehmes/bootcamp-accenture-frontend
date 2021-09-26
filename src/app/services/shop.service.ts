import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  cartQt = new EventEmitter<number>();
  qnt = 0
  items = [];

  constructor() { }

  increaseCart(item) {
    this.cartQt.emit(this.items.length+1)
    this.items.push(item)
    console.log('count ', this.items)
  }

  decreaseCart() {
    // this.count -= 1
  }

  getCounter() {
    return this.cartQt
  }
  

}
