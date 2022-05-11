import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MqttEventService } from '../../services/mqtt-event.service';

const fakeChartData = [
  {
    text: 'Node 1',
    children: [
      {
        text: 'Node 2',
        children: [
          {
            text: 'Node 3'
          },
          {
            text: 'Node 4'
          },
          {
            text: 'Node 5'
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-topology-index',
  templateUrl: './topology-index.component.html',
  styleUrls: ['./topology-index.component.scss']
})
export class TopologyIndexComponent implements OnInit {

  @Input() path = ''
  apData$: Observable<any>;
  chartData = fakeChartData;
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
      map(data => JSON.parse(data.payload.toString())),
      take(1)
    );
    this.mqttClient.fakeResponse(topic);
  }

  classIcon(device: any): any {
    return {
      'text-warning': device.param.quality === 'bad',
      'text-primary': device.param.quality === 'low',
      'text-success': device.param.quality === 'good'
    }
  }

}
