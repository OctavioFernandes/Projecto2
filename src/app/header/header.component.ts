import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
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
  formLogin!: FormGroup;
  statusMsg!: string;
  userValid!: boolean;
  user: User[] = [];

  // @Output() userloged : EventEmitter<User> = new EventEmitter();


  constructor(protected servLogin: LoginserviceService, private router: Router) { }

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


  validateLogin() {
    this.servLogin.getUser(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe(result => {

        this.user = result;

        if (this.formLogin.valid) {

          if (this.validEmail(this.formLogin.value.email)) {

            if (Array.isArray(this.user) && this.user.length && this.user[0].active) {

              // this.userloged.emit(this.user[0]);
              this.servLogin.user=this.user[0];
              this.statusMsg = "Utilizador válido";
              this.servLogin.loged = true;
              this.router.navigateByUrl("");
              setTimeout(() => this.loginPopUp = false, 1000);
              setTimeout(() => this.statusMsg = "", 1000);
              this.formLogin.reset();

              console.log("User loged: "+this.servLogin.loged+"\nUser loged data: ");
              console.log(this.servLogin.user);

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
      })
  }

  logout() {
    this.servLogin.loged = false;
    this.router.navigateByUrl("");
  }

  showOptions(){
    const parent = document.getElementById('dropdowncontainer');
    parent!.style.height = '320px';
    parent!.style.borderBottom = '2.5px solid grey';
  }

  hideOptions(){
    const parent = document.getElementById('dropdowncontainer');
    parent!.style.height = '72px';
    parent!.style.borderBottom = '0';
  }
}
