import { User } from './User.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  urlUser = "http://localhost:3001/cadastro"
  url = "https://viacep.com.br/ws/"

  constructor(private http: HttpClient) { }
  
  getCEP(cep: String) {
    // console.log("viacep.com.br/ws/51260230/json/")
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
    }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUser, user)
  }
}
