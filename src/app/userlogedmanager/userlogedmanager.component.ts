import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/user';

@Component({
  selector: 'app-userlogedmanager',
  templateUrl: './userlogedmanager.component.html',
  styleUrls: ['./userlogedmanager.component.css']
})
export class UserlogedmanagerComponent implements OnInit {

  userLogedIn!:User;

  constructor() { }

  ngOnInit(): void {
  }

  userLoged(user : User){

    // console.log("Mang recebeu user:")
    // console.log(user)

    this.userLogedIn = user;

    // console.log(this.userLogedIn)

  }

}
