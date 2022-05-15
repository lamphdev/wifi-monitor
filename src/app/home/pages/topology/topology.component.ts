import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WifiSettingComponent } from '../wifi-setting/wifi-setting.component';

type TabType = 'index' | 'devices';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyComponent implements OnInit, OnDestroy {

  rateType = 'none';
  tab: TabType = 'index';
  GET_AP_TOPIC = environment.mqttTopic.GET_AP;
  topo: string;
  apData$: Observable<any>;
  initDeviceScreen = false;
  unsubscribe$ = new Subject<void>();

  constructor(private modal: NzModalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p: any) => {
      this.topo = p.id || this.topo
    })
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

  loadDeviceScreen(): void {
    setTimeout(() => {
      this.initDeviceScreen = true;
    })
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
