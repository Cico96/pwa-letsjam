import { Injectable } from '@angular/core';
import {AuthTokenService} from "../auth-token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeUserGuardService {

  constructor(private authToken: AuthTokenService) { }

  canActivate(): boolean {
    return !this.authToken.isAdmin();
  }
}
