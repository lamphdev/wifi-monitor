import { Component, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WifiSettingService } from 'src/app/home/services/wifi-setting.service';
import { WifiSettingComponent } from '../wifi-setting.component';
import { v4 as uuidv4 } from 'uuid';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  passwordVisible = false;
  chanels = [1, 2, 3, 4, 5];
  sessionId: string;

  subcribles = new Set<Subscription>();

  @Input("common_config") common_config: any = {}

  constructor(
    private fb: FormBuilder,
    @Inject(WifiSettingComponent) private parent: WifiSettingComponent,
    private wifiSettingService: WifiSettingService,
    private modal: NzModalService,
  ) { }


  ngOnInit(): void {
    this.sessionId = uuidv4();
    this.validateForm = this.fb.group({
      enable_ssid: [true],
      ssid: [''],
      encrypt_mode: [''],
      security_mode: [''],
      preshared_key: [''],
    });
    let sub = this.wifiSettingService.getGeneralSetting(this.sessionId).subscribe(response => {
      let data = response.objects[0].param;
      this.validateForm.patchValue({
        ssid: data.ssid,
        security_mode: data.security_mode,
        preshared_key: data.preshared_key,
        encrypt_mode: data.encrypt_mode,
      });
    })
    this.subcribles.add(sub);
  }

  submitForm(): void {

    let sub = this.wifiSettingService.settingGeneral(this.validateForm.value, this.sessionId)
      .subscribe(res => {
        this.modal.info({
          nzContent: 'SUCCESS',
          nzOnOk: () => { this.modal.closeAll() }
        })
      });
    this.subcribles.add(sub);
  }

  doClose() {
    this.parent.onClose.emit('general');
  }

  ngOnDestroy(): void {
    this.subcribles.forEach(element => {
      element.unsubscribe()
    });
  }
}
