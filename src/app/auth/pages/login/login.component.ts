import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  typeInput = 'password';

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
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

  toggleType(): void {
    if (this.typeInput === 'text') {
      this.typeInput = 'password';
    } else {
      this.typeInput = 'text';
    }
  }

}
