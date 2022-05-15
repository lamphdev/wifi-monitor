import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, finalize, map, Observable, take, tap, throwError, timeout, TimeoutError } from 'rxjs';
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

  constructor(private deviceService: DeviceService, 
    private noti: NzNotificationService,
    private mqttEvent: MqttEventService) { }

  ngOnInit(): void {
    this.mqttEvent.newSession();
    this.subscribeFromMqtt();
  }

  subscribeFromMqtt(): void {
    this.loading = true;
    const topic = `${environment.mqttTopic.GET_DEVICE}/${this.path}/${this.mqttEvent.currentSession}`;
    this.devices$ = this.mqttEvent.subscribe(topic).pipe(
      timeout(environment.mqttTimeOut),
      map(data => JSON.parse(data.payload.toString())),
      tap(data => console.log(`received: ${JSON.stringify(data)}`)),
      take(1),
      catchError(err => {
        if (err instanceof TimeoutError) {
          this.noti.error('Error', environment.timoutMessage);
          this.loading = false;
        }
        return throwError(() => err);
      }),
      finalize(() => this.loading = false)
    );

    const payload = {
      "from": this.mqttEvent.currentSession,
      "to": this.path,
      "id": 6,
      "type": "get",
      "objects": [
        {
          "name": "host",
          "params": []
        }
      ]
    };
    const jsonPayload = JSON.stringify(payload);
    console.log(`devices publish: ${jsonPayload}`);
    this.mqttEvent.publish(`${environment.mqttTopic.GET_DEVICE}/${this.path}`, jsonPayload);

    // this.mqttEvent.fakeDataDevice(topic);
  }

}
