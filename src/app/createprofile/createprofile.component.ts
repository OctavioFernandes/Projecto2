import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../header/loginservice.service';
import { User } from '../shared/user';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})

export class CreateprofileComponent implements OnInit {

  //octaviomgfernandes@gmail.com

  formProfile!: FormGroup;
  formMensage!: string;
  user!: User;
  validateUserPopUp: boolean = false;
  idToPut!: number;
  insertMode: boolean = true;
  editUserData: boolean = false;

  emailsList: string[] = [];
  emaiDbExist: boolean = false;

  constructor(private servLogin: LoginserviceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    this.formProfile = new FormGroup({
      nome: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required, Validators.pattern('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$')]),

      morada: new FormControl('', [Validators.required]),

      codigoPostal: new FormControl('', [Validators.required, Validators.minLength(8)]),

      pais: new FormControl('', [Validators.required]),

      wishlist: new FormControl([]),

      active: new FormControl(false),

      admin: new FormControl(false)

    });

    //octaviomgfernandes@gmail.com

    if (this.servLogin.loged) {
      this.formProfile.setValue({
        nome: this.servLogin.user.nome,
        email: this.servLogin.user.email,
        password: this.servLogin.user.password,
        morada: this.servLogin.user.morada,
        codigoPostal: this.servLogin.user.codigoPostal,
        pais: this.servLogin.user.pais,
        wishlist: this.servLogin.user.wishlist,
        active: this.servLogin.user.active, 
        admin: this.servLogin.user.admin
      });
      this.insertMode = false;
      this.user = this.servLogin.user;
    }

    this.getEmailsList()

  }

  insertUser() {

    if (this.formProfile.valid) {

      if (this.insertMode) {

        if (!this.emailsList.includes(this.formProfile.value.email)) {

          this.servLogin.insertUser(this.formProfile.value)
            .subscribe(response => {
              this.validateUserPopUp = true;
              this.servLogin.user = {id: this.servLogin.user.id, ...this.formProfile.value};

            });
        } else {
          this.emaiDbExist = true;
        }
      } else {
        let emailsLista = [...this.emailsList];

        emailsLista.splice((emailsLista.indexOf(this.servLogin.user.email)),1);
        
        if (!emailsLista.includes(this.formProfile.value.email)) {
          this.servLogin.editUser(this.formProfile.value, this.servLogin.user.id!)
            .subscribe(response => {
              this.validateUserPopUp = true;
              this.servLogin.user = {id: this.servLogin.user.id, ...this.formProfile.value};
            });
        } else {
          this.emaiDbExist = true;
        }
      }

    }
  }

  closeUserPopUp() {
    this.validateUserPopUp = !this.validateUserPopUp;
    this.router.navigateByUrl('');
    this.formProfile.reset();
  }

  closeEmailExistPopUp() {
    this.emaiDbExist = !this.emaiDbExist;
  }

  activeEditMode() {
    this.editUserData = !this.editUserData
  }

  getEmailsList() {
    this.servLogin.getAllUsers()
      .subscribe(response => {
        for (let index = 0; index < response.length; index++) {
          this.emailsList.push(response[index].email);
        }
      })
  }

}


