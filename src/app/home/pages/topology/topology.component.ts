import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MqttEventService } from '../../services/mqtt-event.service';
import { WifiSettingComponent } from '../wifi-setting/wifi-setting.component';

type TabType = 'index' | 'devices';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyComponent implements OnInit , OnDestroy{

  rateType = 'none';
  tab: TabType = 'index';
  GET_AP_TOPIC = environment.mqttTopic.GET_AP;
  topo = 'VTGR2A27E658';
  apData$: Observable<any>;
  unsubscribe$ = new Subject<void>();

  constructor(private modal: NzModalService, private mqttClient: MqttEventService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // unsubscribe subscription when component destroy
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * switch tab chart/devices
   * @param newTab 
   */
  changeTab(newTab: TabType): void {
    this.tab = newTab;
  }

  /**
   * open wifi config dialog
   */
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
