import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html',
  styleUrls: ['./adm-login.component.css']
})
export class AdmLoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  constructor(private service: ServiceService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: [null,Validators.required],
      senha: [null, Validators.required]
      })
  }
  
  loginValidate (){
    if (!this.loginForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      return
    }
    
    let payload = this.loginForm.value
    // console.log(payload)
    
    this.service.loginAdmValidate(payload).subscribe((data) => {
     this.service.showMessage("Login realizado com sucesso", 'success')
     
     let login = data.email
     console.log('envia pro local ', data)

    
     this.service.sendLoginLocalStorage(true, login)
     
     setTimeout(() => {
       this.route.navigate(['/adm-crud'])
     },700)
       
    },
    err => {
      if (err.status === 500)
     this.service.showMessage("Login ou senha inválidos", 'error')
     else
     this.service.showMessage("Servico offline, contatar o suporte", 'error')
     console.log(err.status)
    })

}

logout() {
  localStorage.clear()
}


}
