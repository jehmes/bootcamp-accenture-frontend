import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.css']
})
export class PopupConfirmComponent implements OnInit {
  
  userId

  constructor(@Inject(MAT_DIALOG_DATA) public data, private service: ServiceService, private router: Router, private matDialog: MatDialog) { 
    this.userId = data.userId
    console.log('id ',this.userId)
  }

  ngOnInit(): void {
  }

  confirmDelete() {
   this.service.deleteUser(this.userId).subscribe((data) => {
      console.log('excluido ')
      this.service.showMessage("Cadastro excluído com sucesso!", 'success')

      window.localStorage.clear()
      this.matDialog.closeAll() 
      this.router.navigate([''])

    }, err => {
      this.service.showMessage("Não foi possível excluir o cadastro!", 'error')
    })
  }
}
