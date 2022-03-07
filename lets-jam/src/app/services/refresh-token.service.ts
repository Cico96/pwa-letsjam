import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "../model/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  currentUser!: User;
  timeoutId?: any;


  constructor(private authService: AuthService, private userService : UserService) {
    this.refreshToken();
  }

  saveLoggedUser(id: string | null) {
    if (id !== null) {
      this.userService.getUserById(parseInt(id)).subscribe((data) => {
        window.localStorage.setItem('user', JSON.stringify(data));
      })
    }
  }

  getLoggedUser() {
    const user = window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  refreshToken() {
    this.timeoutId = setInterval(() => {
      this.authService.refreshToken('response').subscribe((response) => {
        let token = response.headers.get('Authorization')?.split(' ')[1];
        if (token != undefined) {
          window.localStorage.setItem('token', token);
        }
      });
    }, 60000 * 60);
  }

  clearRefreshTimeout() {
    clearTimeout(this.timeoutId);
  }

}
