import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  getAuthToken() {

    return localStorage.getItem('token');
    
  }
}
