import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wifi-setting-form',
  templateUrl: './wifi-setting-form.component.html',
  styleUrls: ['./wifi-setting-form.component.scss']
})
export class WifiSettingFormComponent implements OnInit {

  validateForm!: FormGroup;

  @Input() type = '';

  chanels = [1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      enable: [true],
      mode: [],
      channel: [1],
      band_wide: [],
      power: [],
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

}
