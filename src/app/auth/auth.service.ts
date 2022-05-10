import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private router: Router) {
    this.user = localStorage.getItem('user');
  }

  login(loginData: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', loginData.email);
    this.user = loginData.email;
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return Boolean(isLoggedIn);
  }

}
