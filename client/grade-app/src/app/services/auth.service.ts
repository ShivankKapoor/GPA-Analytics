import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(){
    localStorage.removeItem('token')
    window.location.reload();
  }
}
