import { User } from './User.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  urlUser = "http://localhost:8080/student"
  url = "https://viacep.com.br/ws/"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  
  getCEP(cep: String) {
    // console.log("viacep.com.br/ws/51260230/json/")
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
    }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUser, user)
  }

  showMessage(msg: string, status: string) {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: status
    })
  }
}
