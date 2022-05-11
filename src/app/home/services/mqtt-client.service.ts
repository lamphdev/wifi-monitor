import { Injectable } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttClientService {

  constructor(private _mqttService: MqttService) { }

  connect(topic: string): Observable<any> {
    console.log("connect to topic", topic);
    return this._mqttService.observe(topic)
      .pipe(map(val => {
        console.log(val);

        let payload = new TextDecoder().decode(val.payload);
        try {
          return JSON.parse(payload);
        } catch (error) {
          return payload;
        }
      }))
  }

  publish(topic: string, msg: any) {
    return this._mqttService.publish(topic, JSON.stringify(msg));
  }

}
