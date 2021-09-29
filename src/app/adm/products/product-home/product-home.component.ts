import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service'
import { ShopApiService } from 'src/app/services/shop-api.service'
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from 'src/app/components/popup-confirm/popup-confirm.component'

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao', 'preco', 'action'];

  dataSource: any = []

  allProducts: any = []

  table: any = []

  produto: any = {}

  total: number


  constructor(private productService: ShopService, private productApiService: ShopApiService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getAllProducts()
    
    this.preencherTabela()
  }

  getAllProducts() {
    this.productApiService.getAllProducts().subscribe(products => {
      this.allProducts = products
      this.total = products.length
    })
  }

  preencherTabela() {
    setTimeout(() => {
      this.allProducts.forEach(p => {
        this.table.push(
          {
            id: p.id,
            nome: p.nome,
            descricao: p.descricao,
            preco: p.preco,
            url: p.url
          }
        )
      });

      this.dataSource = this.table
    }, 200)
  }

  sendData(e) {
    let product: any = {}
    product = this.allProducts.filter((prod) => {
      return prod.id === e.id
    })
    this.productService.sendUpdProduct(product)
    // console.log('informaçao ', product)
  }

  openConfirm(element) {
    this.dialog.open(PopupConfirmComponent, {
      data: {
        productId: element.id
      }
    })
  }
}
