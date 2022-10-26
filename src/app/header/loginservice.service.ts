import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private urlAPI = "http://localhost:3000";

  loged : boolean = false;

  user! : User;
  
  constructor(private http : HttpClient) { }

  getUser(email:string , password: string){
    return this.http.get<User[]>(`${this.urlAPI}/users/?email=${email}&password=${encodeURIComponent(password)}`)
  }

  getAllUsers(){
    return this.http.get<User[]>(`${this.urlAPI}/users`)
  }

  getEmail(email:string){
    return this.http.get<User[]>(`${this.urlAPI}/users/?email=${email}`)
  }

  insertUser(user : User) {
    return this.http.post<User>(`${this.urlAPI}/users`, user);
  }

  editUser(user : User, id : number) {
    return this.http.put<User>(`${this.urlAPI}/users/${id}`, user);
  }

//octaviomgfernandes@gmail.com

}
