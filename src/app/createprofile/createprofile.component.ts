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

  @Input()
  set userloged(registo: any) {
    if (registo !== undefined) {
      console.log("sou o perfil e recebi:");
      // console.log(Array.isArray(registo));
      console.log(registo.nome);
      // console.log(this.formProfile.value)
      this.formProfile.setValue({
        nome: registo.nome,
        email: registo.email,
        password: registo.password,
        morada: registo.morada,
        codigoPostal: registo.codigoPostal,
        pais: registo.pais,
        wishlist: registo.wishlist,
        active: registo.active
      });
      this.insertMode = false;
      this.idToPut = registo.id;
      console.log("corri input");
      console.log(this.formProfile.value);
      console.log(this.insertMode);
    }
  }

  formProfile!: FormGroup;
  formMensage!: string;
  user: User[] = [];
  validateUserPopUp: boolean = false;
  idToPut!: number;
  insertMode: boolean = true;

  email: string = "qqq@gmail.com"

  constructor(private servLogin: LoginserviceService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    this.formProfile = new FormGroup({
      nome: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required, Validators.pattern('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$')]),

      morada: new FormControl('', [Validators.required]),

      codigoPostal: new FormControl('', [Validators.required]),

      pais: new FormControl('', [Validators.required]),

      wishlist: new FormControl([]),

      active: new FormControl(false)

    });
    
    console.log(this.formProfile.value);
    console.log(this.insertMode);

  }

  insertUser() {

    if (this.formProfile.valid) {

      if (this.insertMode) {

        this.servLogin.insertUser(this.formProfile.value)
          .subscribe(response => {
            console.log(response)
            this.validateUserPopUp = true;
          });

      } else {
        // Atualizar dados
        // this.validateUserPopUp = true;        
      }

    }
  }

  closeUserPopUp() {
    this.validateUserPopUp = !this.validateUserPopUp;
    this.router.navigateByUrl('');
    this.formProfile.reset();
  }

  // Testes Validar não duplicar emails
  testeEmail(control: FormControl) {
    if (control.value != null && control.value.email === this.email) {
      return { testeEmail: true }
    } else {
      return null
    }
  }

  emailExistDb(control: FormControl) {

    this.servLogin.getEmail(control.value.email)
      .subscribe(result => {

        this.user = result

        if (control.value != null
          && control.value.email === this.user[0].email) {

          return { emailExistDb: true }

        } else {

          return null

        }
      })
  }
  // Testes Validar não duplicar emails
}


