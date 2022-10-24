import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {

  profileForm! : FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.profileForm = new FormGroup({
      nome : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),      
      morada : new FormControl('', [Validators.required]),      
      codigoPostal : new FormControl('', [Validators.required]),      
      pais : new FormControl('', [Validators.required])
    });

  }

  insertUser(){
    console.log(this.profileForm.valid)
    console.log(this.profileForm.value)
  }

}
