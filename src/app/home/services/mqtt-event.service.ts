import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {get_host_response, fake_ap_response} from '../services/data-fake';

@Injectable({
  providedIn: 'root'
})
export class MqttEventService {

  currentSession: string = '';

  constructor(private mqttService: MqttService) { }

  newSession(): void {
    this.currentSession = uuidv4();
  }

  subscribe(topic: string): Observable<IMqttMessage> {
    return this.mqttService.observe(topic, {qos: 1});
  }

  publish(topic: string, json: string) {
    this.mqttService.publish(topic, json)
      .pipe(take(1)).subscribe();
  }

  fakeDataDevice(topic: string) {
    const timer = setInterval(() => {
      const random = get_host_response[Math.floor(Math.random()*get_host_response.length)] 
      const data = JSON.stringify(random);
      this.publish(topic, data);
    }, 1000);
  }

  fakeResponse(topic: string): void {
    setInterval(() => {
      const apData = fake_ap_response[0]
      const data = JSON.stringify(apData);
      this.publish(topic, data);
    }, 1000);
  }

}
