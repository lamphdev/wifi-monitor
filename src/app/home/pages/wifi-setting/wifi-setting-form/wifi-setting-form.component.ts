import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WifiSettingService } from 'src/app/home/services/wifi-setting.service';
import { WifiSettingComponent } from '../wifi-setting.component';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wifi-setting-form',
  templateUrl: './wifi-setting-form.component.html',
  styleUrls: ['./wifi-setting-form.component.scss'],
})
export class WifiSettingFormComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;

  @Input() type: '5ghz' | '2_4ghz';
  @Input("common_config") common_config: any = {}

  subcribles = new Set<Subscription>();

  sessionId: string;

  constructor(
    private fb: FormBuilder,
    @Inject(WifiSettingComponent) private parent: WifiSettingComponent,
    private wifiSettingService: WifiSettingService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {

    this.sessionId = uuidv4();
    this.validateForm = this.fb.group({
      enable: [false],
      mode: [],
      channel: [],
      band_wide: [],
      power: [],
    });

    let sub = this.wifiSettingService.getWifiSetting(this.type, this.sessionId)
      .subscribe(res => {
        // console.log(this.type, res)
        let data = res.objects[0].param;
        this.validateForm.patchValue({
          enable: data.enable === 1,
          mode: data.mode,
          channel: String(data.channel),
          band_wide: data.band_wide,
          power: data.power,
        });
      })
    this.subcribles.add(sub);
  }

  submitForm(): void {

    let sub = this.wifiSettingService.settingWifi(this.type, this.validateForm.value, this.sessionId)
      .subscribe(res => {

        if (res.errors?.length) {
          let ref = this.modal.error({
            nzContent: res.errors
              .map((e: any) => '<div>' + e.cause + '</div>')
              .join(''),
            nzOnOk: () => {
              ref.close();
            },
          });
        } else {
          this.modal.info({
            nzContent: 'SUCCESS',
            nzOnOk: () => {
              this.modal.closeAll();
            },
          });
        }

      });

    this.subcribles.add(sub);
  }

  doClose() {
    this.parent.onClose.emit(this.type);
  }

  ngOnDestroy(): void {
    this.subcribles.forEach(element => {
      element.unsubscribe()
    });
  }
}
