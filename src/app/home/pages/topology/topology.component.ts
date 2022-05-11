import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DeviceService } from '../../services/device.service';
import { WifiSettingComponent } from '../wifi-setting/wifi-setting.component';

type TabType = 'index' | 'devices';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyComponent implements OnInit {

  rateType = 'none';
  tab: TabType = 'index';

  constructor(private modal: NzModalService) { }

  ngOnInit(): void {

  }

  changeTab(newTab: TabType): void {
    this.tab = newTab;
  }

  openWifiConfig(): void {
    this.modal.create({
      nzContent: WifiSettingComponent,
      nzFooter: null,
      nzComponentParams: {
        close: evt => { this.modal.closeAll() }
      }
    })
  }

}
