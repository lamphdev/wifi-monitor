import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MqttEventService } from '../../services/mqtt-event.service';

@Component({
  selector: 'app-topology-index',
  templateUrl: './topology-index.component.html',
  styleUrls: ['./topology-index.component.scss']
})
export class TopologyIndexComponent implements OnInit {

  @Input() path = ''
  apData$: Observable<any>;
  GET_AP_TOPIC = environment.mqttTopic.GET_AP;

  constructor(private mqttClient: MqttEventService) { }

  ngOnInit(): void {
    this.mqttClient.newSession();
    this.subscribeAp();
  }

  /**
   * subscribe ap info from mqtt
   */
   subscribeAp(): void {
    const topic = `${this.GET_AP_TOPIC}/${this.path}/${this.mqttClient.currentSession}`;
    this.apData$ = this.mqttClient.subscribe(topic).pipe(
      map(data => JSON.parse(data.payload.toString()))
    );
    this.mqttClient.fakeResponse(topic);
  }

}
