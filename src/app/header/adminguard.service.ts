import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from './loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  constructor(private loginservice: LoginserviceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log("this.loginservice.user.admin");
    console.log(this.loginservice.admin);
    console.log(this.loginservice.loged);

    if (this.loginservice.loged && this.loginservice.user.admin) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }
}
