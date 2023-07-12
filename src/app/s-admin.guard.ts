import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SAdminGuard implements CanActivate {
  user:any={};
  constructor(private auth:AuthService){
    this.auth.getisLogged().subscribe((user)=>
    {
      this.user=user
      // console.log(this.user.claims)
      // if (this.user.claims.superAdmin)
      //     console.log(this.user.claims.superAdmin)
      // console.log(this.user.claims['superAdmin'])
    }
    )  
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.isSuperAdmin();
  }
  
}
