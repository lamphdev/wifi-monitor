import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    const {valid, value} = this.formLogin;
    if (valid)  {
      this.authService.login(value);
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

}
