import { User } from '../models/User.model';
import { Login } from '../models/Login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  urlUser = "http://localhost:8080/user"
  urlLogin = "http://localhost:8080/login"
  urlDeposito = "http://localhost:8080/deposito"
  urlUserId = "http://localhost:8080/user/"
  urlUserDelete = "http://localhost:8080/user/delete/"
  urlUpdateUser = "http://localhost:8080/user/update/"
  urlLoginAdm = "http://localhost:8080/login-adm"
  


  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  
  sendLoginLocalStorage(adm: boolean, data: any) {
    // console.log('teste ',data)
    if (adm) {
      localStorage.setItem("loginAdm", data)

    }
    else {
      localStorage.setItem("id", data.id)
      localStorage.setItem("points", data.score)
      localStorage.setItem("login", data.nome)
      // console.log(data)
    }
   
    
  }

  getLocalStorage(): Observable<any> {
    let id = JSON.parse(localStorage.getItem('id') || '{}');
    let login = localStorage.getItem('login')
    let score = JSON.parse(localStorage.getItem('points') || '{}');
    let loginAdm = localStorage.getItem('loginAdm');
    
    let profileInfo = {
      id,
      login,
      score,
      loginAdm
    }
    return of(profileInfo)
  }

  getCEP(cep: String) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
    }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUser, user)
  }

  getallUsers(): Observable<any> {
    return this.http.get<any>(this.urlUser)
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlUserId}${id}`)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlUserDelete}${id}`)
  }

  updateUser(user: User, id: number): Observable<User> {
    return this.http.post<User>(`${this.urlUpdateUser}${id}`, user)
  }

  loginValidate(login: Login): Observable<Login> {
    return this.http.post<Login>(this.urlLogin, login)
  }

  loginAdmValidate(login: any): Observable<any> {
    return this.http.post<any>(this.urlLoginAdm, login)
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
