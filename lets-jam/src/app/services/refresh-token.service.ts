import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {


  timeoutId?: number;


  constructor(private authService: AuthService) {
  }

  refreshToken() {
    this.timeoutId = setTimeout(() => {
      this.authService.refreshToken().subscribe((response) => {
        let token = response.headers.get('Authorization')?.split(' ')[1];
        if (token != undefined) {

          // window.localStorage.removeItem('token');

          window.localStorage.setItem('token', token)
        }
      });
    }, 60000)
  }

  clearRefreshTimeout() {
    clearTimeout(this.timeoutId);
  }

}
