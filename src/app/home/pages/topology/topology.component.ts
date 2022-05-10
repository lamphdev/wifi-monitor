import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';

type TabType = 'index' | 'devices';

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyComponent implements OnInit {

  rateType = 'internet';
  tab: TabType = 'index';

  constructor(private devicesService: DeviceService) { }

  ngOnInit(): void {
    
  }

  changeTab(newTab: TabType): void {
    this.tab = newTab;
  }

}
