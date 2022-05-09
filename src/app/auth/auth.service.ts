import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(loginData: any) {
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return Boolean(isLoggedIn);
  }

}
