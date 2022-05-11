import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WifiSettingService } from 'src/app/home/services/wifi-setting.service';
import { WifiSettingComponent } from '../wifi-setting.component';

@Component({
  selector: 'app-wifi-setting-form',
  templateUrl: './wifi-setting-form.component.html',
  styleUrls: ['./wifi-setting-form.component.scss'],
})
export class WifiSettingFormComponent implements OnInit {
  validateForm!: FormGroup;

  @Input() type: '5ghz' | '2_4ghz';

  chanels = [15, 56];

  constructor(
    private fb: FormBuilder,
    @Inject(WifiSettingComponent) private parent: WifiSettingComponent,
    private wifiSettingService: WifiSettingService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      enable: [true],
      mode: [],
      channel: [],
      band_width: [],
      power: [],
    });
    this.wifiSettingService.getWifiSetting(this.type, {})
      .subscribe(res => {
        let data = res.objects[0].param;
        this.validateForm.patchValue({
          mode: data.mode,
          channel: data.channel,
          band_width: data.band_width,
          power: data.power,
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
    this.parent.onClose.emit(this.type);
  }
}
