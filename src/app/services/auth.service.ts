import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service: ServiceService) { }

  isLoggedUser(): boolean {
    let isLogged: boolean = false;
    this.service.getLocalStorage().subscribe((data) => {

      if(data.id > 0)
      isLogged = true
      else
      isLogged = false
    })

    return isLogged
  }

  isLoggedAdm(): boolean {
    let isLogged: boolean = false;
    this.service.getLocalStorage().subscribe((data) => {

      if(data.loginAdm != null || data.loginAdm != undefined)
      isLogged = true
      else
      isLogged = false
    })

    return isLogged
  }

  isLoggedAdmObs(): Observable<boolean> {
    let isLogged: boolean = false;
    this.service.getLocalStorage().subscribe((data) => {

      if(data.loginAdm != null || data.loginAdm != undefined)
      isLogged = true
      else
      isLogged = false
    })

    return of(isLogged)
  }
  
}
