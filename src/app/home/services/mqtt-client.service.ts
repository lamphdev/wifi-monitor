import { Injectable } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttClientService {
  constructor(private _mqttService: MqttService) {}

  connect(topic: string): Observable<any> {
    return this._mqttService.observe(topic).pipe(
      map((val) => {
        let payload = new TextDecoder().decode(val.payload);
        try {
          return JSON.parse(payload);
        } catch (error) {
          return payload;
        }
      }),
      map((val) => {
        console.log('recived from: ' + topic, JSON.stringify(val));
        return val;
      })
    );
  }

  publish(topic: string, msg: any) {
    return this._mqttService.publish(topic, JSON.stringify(msg));
  }
}
