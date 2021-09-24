import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-deposito-update',
  templateUrl: './deposito-update.component.html',
  styleUrls: ['./deposito-update.component.css']
})
export class DepositoUpdateComponent implements OnInit {

  data: any

  upgradeForm!: FormGroup;
  
  constructor(private service: ServiceService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.createForm()

    this.data = this.service.getUpgDeposito()

    console.log('teste ',this.data)
  }

  createForm() {
    this.upgradeForm = this.formBuilder.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }

  upgradeDep() {

  }

}
