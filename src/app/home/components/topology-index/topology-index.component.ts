import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
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
export class TopologyIndexComponent implements OnInit , OnDestroy{

  @Input() path = ''
  apData$: Observable<any>;
  searchResult: any[];
  chartData = fakeChartData;
  GET_AP_TOPIC = environment.mqttTopic.GET_AP;

  searchControl = new FormControl('');
  unsubscribe$ = new Subject<void>();

  constructor(private mqttClient: MqttEventService) { }

  ngOnInit(): void {
    this.mqttClient.newSession();
    this.subscribeAp();
    this.addSearchHandle();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
      'text-danger': device.param.quality === 'bad',
      'text-warning': device.param.quality === 'low',
      'text-success': device.param.quality === 'good'
    }
  }

  addSearchHandle(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(300),
      switchMap((value) => this.apData$.pipe(
        take(1),
        tap((data) => this.search(data.objects, value))
      ))
    ).subscribe()
  }

  search(source: any[], keyword: string): void {
    if (!keyword) {
      this.searchResult = source;
      return;
    }
    this.searchResult = source.filter(el => {
      return el.param.manufacturer?.toLowerCase().includes(keyword) ||
        el.param.product_class?.toLowerCase().includes(keyword) ||
        el.param.serial_number?.toLowerCase().includes(keyword) ||
        el.param.mac_address?.toLowerCase().includes(keyword)
    })
  }

}
