import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "../model/user";
import {UserService} from "./user.service";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  timeoutId?: any;


  constructor(private authService: AuthService, private userService : UserService) {
    this.refreshToken();
  }

  saveLoggedUser(id: string | null) {
    if (id !== null) {
      this.userService.getUserById(parseInt(id)).subscribe((data) => {
        window.localStorage.setItem('user', JSON.stringify(data));
        this.currentUser.next(data);
        console.log(data)
      })
    }
  }

  getLoggedUser() {
    const user = window.localStorage.getItem('user');
    if (user) {
      console.log(user)
      this.currentUser.next(JSON.parse(user))
    }
    return this.currentUser.asObservable();
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
