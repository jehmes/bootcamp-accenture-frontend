import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private service: ServiceService) { }

  isLogged(): boolean {
    let isLogged: boolean = false;
    this.service.getLocalStorage().subscribe((data) => {

      if(data.id > 0 || data.loginAdm != null)
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
  
}
