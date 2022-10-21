import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private urlAPI = "http://localhost:3000";

  loged : boolean = false;


  constructor(private http : HttpClient) { }

  userValid(email:string , password: string){
    //http://localhost:3000/users/?email=octaviomgfernandes@gmail.com&password=1234
    return this.http.get<User>(`${this.urlAPI}/users/?email=${email}&password=${password}`)
  }


}
