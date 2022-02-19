import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private authToken: AuthTokenService) { }

  canActivate(): boolean {

    if(!this.authToken.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
