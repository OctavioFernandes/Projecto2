import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {

  formProfile! : FormGroup;
  
  constructor() { }

  ngOnInit(): void {

    this.formProfile = new FormGroup({
      nome : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),      
      morada : new FormControl('', [Validators.required]),      
      codigoPostal : new FormControl('', [Validators.required]),      
      pais : new FormControl('', [Validators.required])
    });

  }

  insertUser(){
    console.log(this.formProfile.valid)
    console.log(this.formProfile.value)
  }

}
