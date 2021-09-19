import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // elm: any
  showProfile: any = true
  showProfileInfo: any = true

  reload: any
  idLogin: number
  pointsLogin: number
  nameLogin: string

  user : any

  constructor(private router: Router, private service: ServiceService) { 
  
    
  }

  ngOnInit(): void {

    this.router.events.subscribe(() => {
      this.idLogin = JSON.parse(localStorage.getItem('id') || '{}');
      this.idLogin >= 0 ? this.showProfile = false : this.showProfile = true
      this.pointsLogin = JSON.parse(localStorage.getItem('points') || '{}');
      this.nameLogin = localStorage.getItem('login')
      this.reload = localStorage.getItem('reload')
    })

  }
  
   logout() {
     localStorage.clear()
     this.user = null
     this.reload = null
   }
  

  goToInicial() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  }

  

  
