import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  cartQt = new EventEmitter<number>();
  urlUpdateUser = "http://localhost:8080/user/discount"
  productDataUpd: any

  constructor(private http: HttpClient) { }

  discountScore(userId: any, spendScore: number) {
    this.cartQt.emit(0)
    return this.http.post<any>(`${this.urlUpdateUser}/${userId}`, spendScore)
  }

  increaseCart(item: any, action: string) {
    //Incrementa a quant do carrinho e emite quant de itens no cart pro header
    this.cartQt.emit(this.getCounterLocalStor() + 1)

    this.saveItemLocalStor(item, action)
  }

  decreaseCart(item: any, action: string) {
    let quant

    //Só decrementa caso a quantidade desse item seja maior que 1 e emite
    if (item.quant > 1) {
      quant = this.getCounterLocalStor() - 1
      this.cartQt.emit(quant)

      this.saveItemLocalStor(item, action)
    }
  }

  removeItem(id) {
    let cart = this.getCartLocalStor()
    let position = this.findItemById(id)
    cart.splice(position, 1)

    let jsonAux = JSON.stringify(cart)

    window.localStorage.setItem('cart', jsonAux)
    this.cartQt.emit(this.getCounterLocalStor())

  }

  findItemById(id) {
    let cart = this.getCartLocalStor()
    let position
    cart.forEach((item, index) => {
      if (item.product.id === id)
      position = index
    })
    console.log(position)
    return position
  }

  getCounter() {
    return this.cartQt
  }

  getCounterLocalStor() {
    //Retorna a quantidade de itens do cart no localStorage
    let count: number = 0;
    let cart = this.getCartLocalStor()
    cart.forEach((item) => {
      if (item.product.quant > 1) {
        count += item.product.quant
      } else {
        count += 1
      }
    })
    // console.log('contador service', count)
    return count
  }

  saveItemLocalStor(item, action) {
    let quantItem
    let currentCart = this.getCartLocalStor()

    //Verifica se existe o mesmo item e retorna a quantidade desse item. Caso exista
    //exclui o antigo e abaixo acontece uma nova inserção
    quantItem = this.findSameProduct(currentCart, item, action)

    //Cria o objeto do produto, independente se ja existe ou não
    let itemObj = {
      product: item,
    }
    itemObj.product.quant = 1

    //Caso o produto ja exista, incrementa ou decrementa a quant e ajusta o valor total
    if (quantItem >= 1) {
      itemObj.product.quant = quantItem
      itemObj.product.precoTotal = itemObj.product.preco * quantItem
    }

    currentCart.push(itemObj)

    let jsonAux = JSON.stringify(currentCart)

    window.localStorage.setItem('cart', jsonAux)
  }

  getCartLocalStor() {
    let cart: any[]
    let cartString: any
    cartString = window.localStorage.getItem("cart")

    cart = JSON.parse(cartString)
    cart = cart === null ? [] : cart
    // console.log('CART DO LOCAL ',cart)
    return cart
  }

  findSameProduct(currentCart, item, action) {
    let quant: number = 1
    currentCart.forEach((product, index) => {
      if (product.product.id === item.id) {
        switch (action) {

          case "inc":
            //Exclui produto existente para depois ser inserido com
            //a quant e valor ajustado
            currentCart.splice(index, 1)
            quant = product.product.quant + 1
            break;

          case "dec":
            currentCart.splice(index, 1)
            quant = product.product.quant - 1
            break;

          default:
            break;
        }
    
      }

    })
    return quant
  }


  sendUpdProduct(data: any) {
    this.productDataUpd = data
  }

  getUpgProduct() {
    return this.productDataUpd
  }
}
