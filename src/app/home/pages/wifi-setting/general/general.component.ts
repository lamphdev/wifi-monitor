import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  chanels = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      enable_ssid: [true],
      ssid: ['XXXXXXXXX'],
      auth_mode: ['WPA'],
      sercurity_mode: ['AES'],
      shared_key: ['XXXXXXXXX'],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  genderChange(value: string): void {
    this.validateForm
      .get('note')!
      .setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }
}
