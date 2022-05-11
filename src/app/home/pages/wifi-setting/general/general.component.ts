import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WifiSettingService } from 'src/app/home/services/wifi-setting.service';
import { WifiSettingComponent } from '../wifi-setting.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  chanels = [1, 2, 3, 4, 5];

  @Input("common_config") common_config: any = {}

  constructor(
    private fb: FormBuilder,
    @Inject(WifiSettingComponent) private parent: WifiSettingComponent,
    private wifiSettingService: WifiSettingService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      enable_ssid: [true],
      ssid: [''],
      encrypt_mode: [''],
      security_mode: [''],
      preshared_key: [''],
    });
    this.wifiSettingService.getGeneralSetting(uuidv4()).subscribe(response => {
      let data = response.objects[0].param;
      this.validateForm.patchValue({
        ssid: data.ssid,
        security_mode: data.security_mode,
        preshared_key: data.preshared_key,
        encrypt_mode: data.encrypt_mode,
      });
    })
  }

  submitForm(): void {

    let request = {
      "from": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
      "to": "VTGR123456",
      "id": 3,
      "type": "set",
      "objects": [
        {
          "name": "wifi",
          "instance": 1,
          "param": {
            "ssid_index": 1,
            ...this.validateForm.value
          }
        }
      ]
    }
    this.wifiSettingService.settingGeneral(request)
      .subscribe(res => {
        this.modal.info({
          nzContent: 'SUCCESS',
          nzOnOk: () => { this.modal.closeAll() }
        })
      });
  }

  doClose() {
    this.parent.onClose.emit('general');
  }
}
