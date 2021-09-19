import { User } from './models/User.model';
import { Login } from './models/Login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  urlUser = "http://localhost:8080/user-create"
  urlLogin = "http://localhost:8080/login"
  urlDeposito = "http://localhost:8080/deposito"
  urlUserId = "http://localhost:8080/user-create/"
  urlUpdateUser = "http://localhost:8080/user-create/update/"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  
  getCEP(cep: String) {
    // console.log("viacep.com.br/ws/51260230/json/")
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
    }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUser, user)
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlUserId}${id}`)
  }

  updateUser(user: User, id: number): Observable<User> {
    return this.http.post<User>(`${this.urlUpdateUser}${id}`, user)
  }

  loginValidate(login: Login): Observable<Login> {
    return this.http.post<Login>(this.urlLogin, login)
  }

  getAllDepositos(): Observable<any> {
    return this.http.get<any>(this.urlDeposito)
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
