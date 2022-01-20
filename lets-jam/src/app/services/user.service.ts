import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers(id: number, username: string, role: string) {
    return [
      {"id": 1, "firstname": "Jacopo", "lastname": "Cicoria", "username": "cicogang", "email": "cico@lutop.com", "role": "UTENTE", "avatar": "fotofoto"}
    ];
  }
}
