import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { ShopApiService } from 'src/app/services/shop-api.service'

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.css']
})
export class PopupConfirmComponent implements OnInit {

  userId
  productId

  constructor(@Inject(MAT_DIALOG_DATA) public data, private service: ServiceService, private router: Router, private matDialog: MatDialog, private shopService: ShopApiService) {
    this.userId = data.userId
    this.productId = data.productId
  }

  ngOnInit(): void {
  }

 
  confirmDelete() {
    if (this.userId) {
      this.service.deleteUser(this.userId).subscribe((data) => {
        this.service.showMessage("Cadastro excluído com sucesso!", 'success')
  
        window.localStorage.clear()
        this.matDialog.closeAll()
        this.router.navigate([''])
  
      }, err => {
        this.service.showMessage("Não foi possível excluir o cadastro!", 'error')
        console.log(err)
      })
    }
  
    if (this.productId) {
      this.shopService.deleteProduct(this.productId).subscribe((data) => {
        this.service.showMessage("Produto excluído com sucesso!", 'success')

        this.matDialog.closeAll()
        location.reload()
      }, err => {
        this.service.showMessage("Não foi possível excluir o produto!", 'error')
        console.log(err)
      })
    }

  }
}
