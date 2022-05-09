import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeviceService } from '../../services/device.service';
import { MqttEventService } from '../../services/mqtt-event.service';

@Pipe({name: 'deviceFilter'})
export class DeviceFilterPipe implements PipeTransform {
  transform(value: any[], ...args: any[]) {
    const keySearch = args[0] as string;
    return value.filter(el => !keySearch ||
      el.param.name?.toLowerCase().includes(keySearch) ||
      el.param.model?.toLowerCase().includes(keySearch) ||
      el.param.mac_address?.toLowerCase().includes(keySearch) ||
      el.param.ip_address?.toLowerCase().includes(keySearch)
    )
  }
}

@Component({
  selector: 'app-topology-device',
  templateUrl: './topology-device.component.html',
  styleUrls: ['./topology-device.component.scss']
})
export class TopologyDeviceComponent implements OnInit {

  @Input() path = '';
  groupBy = 'none';
  devices$: Observable<any>;
  loading = false;

  constructor(private deviceService: DeviceService, private mqttEvent: MqttEventService) { }

  ngOnInit(): void {
    this.mqttEvent.newSession();
    this.subscribeFromMqtt();
  }

  subscribeFromMqtt(): void {
    const topic = `${environment.mqttTopic.GET_DEVICE}/${this.path}/${this.mqttEvent.currentSession}`;
    this.devices$ = this.mqttEvent.subscribe(topic).pipe(
      map(data => JSON.parse(data.payload.toString())),
      take(1)
    );
    this.mqttEvent.fakeDataDevice(topic);
  }

}
