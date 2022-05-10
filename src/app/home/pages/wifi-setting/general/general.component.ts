import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WifiSettingComponent } from '../wifi-setting.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  chanels = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    @Inject(WifiSettingComponent) private parent: WifiSettingComponent
  ) {}

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

  doClose() {
    this.parent.onClose.emit('general');
  }
}
