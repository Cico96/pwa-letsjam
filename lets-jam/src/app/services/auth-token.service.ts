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
  
}
