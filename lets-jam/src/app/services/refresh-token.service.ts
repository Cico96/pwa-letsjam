import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {


  timeoutId?: number;


  constructor(private authService: AuthService) {
    this.refreshToken();
    
  }

  refreshToken() {
    this.timeoutId = window.setTimeout(() => {
      this.authService.refreshToken('response').subscribe((response) => {
        let token = response.headers.get('Authorization')?.split(' ')[1];
        console.log('stampa del refresh token', token)
        if (token != undefined) {

          window.localStorage.setItem('token', token);
          console.log('setto effettivamente il token')

        }
      });
    }, 60000 * 10)
  }

  clearRefreshTimeout() {
    clearTimeout(this.timeoutId);
  }

}
