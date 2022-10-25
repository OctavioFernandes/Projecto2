import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LoginserviceService } from '../header/loginservice.service';
import { User } from '../shared/user';


@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {

  formProfile! : FormGroup;
  formMensage! : string;
  user: User[] = [];

  email: string = "qqq@gmail.com"
  
  constructor(private servLogin: LoginserviceService) { }

  ngOnInit(): void {

    this.formProfile = new FormGroup({
      nome : new FormControl('', [Validators.required]),

      email : new FormControl('', [Validators.required, Validators.email]),

      password : new FormControl('', [Validators.required, Validators.pattern('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$')]),    

      morada : new FormControl('', [Validators.required]),  

      codigoPostal : new FormControl('', [Validators.required]),   

      pais : new FormControl('', [Validators.required])

    });

  }

  insertUser(){
    console.log("Tentou registar")
    if (this.formProfile.valid) {
      
    } else {
      
    }
    console.log(this.formProfile.valid)
    console.log(this.formProfile.value)
  }

  testeEmail(control: FormControl){
    if (control.value != null && control.value.email === this.email) {
      return {testeEmail:true}
    } else {
      return null
    }
  }

  emailExistDb(control: FormControl){

    this.servLogin.getEmail(control.value.email)
    .subscribe(result=> {

      this.user=result

      if (control.value != null 
        && control.value.email === this.user[0].email) {

        return {emailExistDb:true}

      } else {

        return null
        
      }
    })
  }


}


