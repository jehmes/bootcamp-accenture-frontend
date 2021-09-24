import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-deposito-crud',
  templateUrl: './deposito-crud.component.html',
  styleUrls: ['./deposito-crud.component.css']
})
export class DepositoCrudComponent implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    
    this.cadastroForm = this.formBuilder.group({
        nome: [null, Validators.required],
        criador: ["adm"],
        endereco: this.formBuilder.group({
          cep: [null, Validators.required],
          logradouro: [null, Validators.required],
          bairro: [null, Validators.required],  
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
          numero: [null, Validators.required],
        })
      
      })
  }

  createDeposito() {
    console.log(this.cadastroForm.value)
    if (!this.cadastroForm.valid) {
      this.service.showMessage("Campos inválidos!", 'error')
      console.log(this.cadastroForm.value)
      return
    }
  }

  consultarCEP(cep: any) {
    if (cep.target.value.length == 8) {
     const value = cep.target.value
  
      this.service.getCEP(value).subscribe((dados) => {
        this.popularEndereco(dados)
      })
    } 
  }
  
  popularEndereco(dados: any) {
    this.cadastroForm.get('endereco')?.get('logradouro')?.setValue(dados.logradouro)
    this.cadastroForm.get('endereco')?.get('bairro')?.setValue(dados.bairro)
    this.cadastroForm.get('endereco')?.get('cidade')?.setValue(dados.localidade)
    this.cadastroForm.get('endereco')?.get('estado')?.setValue(dados.uf)
  }
  
   //input apenas numeros
   keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
   }
  
  //input apenas letras
  keyPressLetters(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // //console.log(charCode)
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  
  limparForm() {
    this.cadastroForm.reset()
    // this.cadastroForm.get("deposito")?.setValue("")
   }
}
