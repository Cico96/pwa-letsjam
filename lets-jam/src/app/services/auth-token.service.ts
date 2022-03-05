import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  getAuthToken() {

    return localStorage.getItem('token');

  }

  isAuthenticated(): boolean {

    if(localStorage.getItem('token')) {
      return true;
    }else {
      return false;
    }

  }

  isAdmin(): boolean {
    let usr = localStorage.getItem('user')
    if (usr) {
      let user = JSON.parse(usr)
      return user.role == 'AMMINISTRATORE';
    }
    return false
  }

}
