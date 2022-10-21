import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginPopUp: boolean = false;

  loged: boolean = true;

  formLogin!: FormGroup;

  statusMsg!: string;

  userValid!: boolean;

  user!: User;


  constructor(private servLogin: LoginserviceService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  loginPopUpLoginShow() {
    if (this.loginPopUp === true) {
      this.loginPopUp = false;
    } else {
      this.loginPopUp = true
    }
  }

  validEmail(email: string) {

    let valid = true;

    if (!email.includes("@")
      || email[email.indexOf("@") - 1] === undefined
      || email[email.indexOf("@") - 1] === " "
      || email[email.indexOf("@") + 1] === undefined
      || email[email.indexOf("@") + 1] === " "
      || !email.substring(email.indexOf("@") + 2).includes(".")
      || email[email.indexOf("@") + 1] === "."
      || email[email.indexOf(".") + 1] === undefined
      || email[email.indexOf(".") + 1] === " "
      || email[email.indexOf(".") + 2] === undefined
      || email[email.indexOf(".") + 2] === " ") {

      valid = false;
    }
    return valid;
  }

  validateUser(email: string, password: string) {

    this.servLogin.userValid(email, password)
      .subscribe(result => {

        this.user = result;

        // console.log(this.user)
        console.log(this.user)
        console.log(Array.isArray(this.user))

        if (Array.isArray(this.user) && !this.user.length) {
          console.log("Invalido")
        } else {          
          console.log("valido")          
        }


      })




    // if (response !== undefined) {
    //   this.userValid = true;
    // } else {
    //   this.userValid = false
    // }


    //octaviomgfernandes@gmail.com
    // console.log(this.userValid)
    return this.userValid;
  }

  validateLogin() {

    if (this.formLogin.valid) {

      if (this.validEmail(this.formLogin.value.email)) {

        if (this.validateUser(this.formLogin.value.email, this.formLogin.value.password)) {

          this.statusMsg = "Utilizador válido";
          this.loged = true;
          setTimeout(() => this.loginPopUp = false, 2000);

        } else {
          this.statusMsg = "Utilizador inexistente!";
        }

      } else {
        this.statusMsg = "O email tem um formato incorreto!";
      }

    }
    else {
      this.statusMsg = "Os dois campos são de preenchimento obrigatório!";
    }
  }

  logout() {
    this.loged = false;
  }




}
