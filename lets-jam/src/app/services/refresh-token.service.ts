import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {


  timeoutId?: any;


  constructor(private authService: AuthService) {
    this.refreshToken();
    
  }

  refreshToken() {
    this.timeoutId = setInterval(() => {
      this.authService.refreshToken('response').subscribe((response) => {
        let token = response.headers.get('Authorization')?.split(' ')[1];
        console.log('stampa del refresh token', token)
        if (token != undefined) {

          window.localStorage.setItem('token', token);  
          console.log('setto effettivamente il token')

        }
      });
      console.log('pdfkepwodfke')
    }, 60000 * 5);
  }

  clearRefreshTimeout() {
    clearTimeout(this.timeoutId);
    console.log('abbiamo pulito', this.timeoutId)
  }

}
