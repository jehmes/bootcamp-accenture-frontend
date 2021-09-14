import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  constructor() { 
  
    
  }

  ngOnInit(): void {
  
  }
  
  // menuItems = document.querySelectorAll('.menu-itens a');

  goToInicial() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  }

  

  
