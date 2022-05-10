import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-topology-device',
  templateUrl: './topology-device.component.html',
  styleUrls: ['./topology-device.component.scss']
})
export class TopologyDeviceComponent implements OnInit {

  groupBy = 'none';
  devices: any[] = [];
  loading = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices(): void {
    this.loading = true;
    this.deviceService.getDevices().pipe(
      take(1),
      finalize(() => this.loading = false)
    ).subscribe(res => {
      this.devices = res;
    });
  };


}
