import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { User } from '../shared/user';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginPopUp: boolean = false;

  waitingServer!: boolean;

  loged: boolean = true;

  formLogin!: FormGroup;

  statusMsg!: string;

  userValid!: boolean;

  user!: User;


  constructor(private servLogin: LoginserviceService, private router : Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  loginPopUpLoginShow() {
    this.loginPopUp = !this.loginPopUp;
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

    this.servLogin.userValid(email, password )
    .subscribe(result => {

      this.user = result;

      if (Array.isArray(this.user) && !this.user.length) {
        this.userValid=false;
      } else {          
        this.userValid=true;  
      }
    })
  }

  validateLogin() {

    this.validateUser(this.formLogin.value.email, this.formLogin.value.password)



    //octaviomgfernandes@gmail.com

    if (this.formLogin.valid) {

      
      setTimeout(() => this.waitingServer=true, 2000);

      if (this.validEmail(this.formLogin.value.email)) {

        if (this.userValid) {

          this.statusMsg = "Utilizador válido";
          this.loged = true;
          this.formLogin.reset()
          this.router.navigate([""])
          setTimeout(() => this.loginPopUp = false, 1000);          

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
