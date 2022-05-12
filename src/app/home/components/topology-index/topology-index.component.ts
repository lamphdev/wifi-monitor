import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ChartNode } from 'src/app/shared/model/chart-node';
import { environment } from 'src/environments/environment';
import { MqttEventService } from '../../services/mqtt-event.service';

const fakeChartData: ChartNode[] = [
  {
    text: 'Internet',
    children: [
      {
        text: 'Moderm 1',
        speedUp: 23,
        speedDown: 44,
        type: 'ethernet',
        children: [
          {
            text: 'Pc 01',
            type: 'ethernet',
            speedDown: 30.51,
            speedUp: 65.63
          },
          {
            text: 'Iphone',
            type: 'wifi',
            speedDown: 44.56,
            speedUp: 75.23
          },
          {
            text: 'Tablet',
            type: 'wifi',
            speedDown: 42.02,
            speedUp: 22.13
          }
        ]
      }
    ]
  }
];

@Pipe({name: 'apfilter'})
export class ApFilterPipe implements PipeTransform {
  transform(value: any[], ...args: any[]) {
    const keyword = args[0] as string;
    return value.filter(el => {
      return el.param.manufacturer?.toLowerCase().includes(keyword) ||
        el.param.product_class?.toLowerCase().includes(keyword) ||
        el.param.serial_number?.toLowerCase().includes(keyword) 
    })
  }
}

@Component({
  selector: 'app-topology-index',
  templateUrl: './topology-index.component.html',
  styleUrls: ['./topology-index.component.scss']
})
export class TopologyIndexComponent implements OnInit {

  @Input() path = ''
  apData$: Observable<any>;
  searchResult: any[];
  chartData: ChartNode[] = [];
  GET_AP_TOPIC = environment.mqttTopic.GET_AP;

  searchString = '';
  searchControl = new FormControl('');

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
      tap(data => this.buildChartTree(data?.objects)),
      take(1)
    );
    // const request = {
    //   "from": this.mqttClient.currentSession,
    //   "to": this.path,
    //   "id": 2,
    //   "type": "get",
    //   "objects": [
    //     {
    //       "name": "ap",
    //       "instance": 2,
    //       "params": []
    //     }
    //   ]
    // };
    // this.mqttClient.publish(`${this.GET_AP_TOPIC}/${this.path}`, JSON.stringify(request));
    this.mqttClient.fakeResponse(topic);
  }

  async buildChartTree(data: any[]): Promise<any> {
    if (!data) {
      return;
    }
    const tree = this.chartData = data.filter(item => item.param.mac_backhaul_ap === 'none')
      .map(item => this.findChild(item, data));
    console.log(tree);
    this.chartData = [
      {
        text: 'Internet',
        children: tree
      }
    ];
  }

  findChild(dataNode: any, source: any[]): ChartNode {
    const children = source.filter(el => el.param.mac_backhaul_ap === dataNode.param.mac_address);
    return {
      ...dataNode,
      text: dataNode.param.product_class,
      type: dataNode.param.backhaul_link,
      speedUp: Math.random() * 100,
      speedDown: Math.random() * 100,
      children: children.map(child => this.findChild(child, source))
    }
  }

  classIcon(device: any): any {
    return {
      'text-danger': device.param.quality === 'bad',
      'text-warning': device.param.quality === 'low',
      'text-success': device.param.quality === 'good'
    }
  }

}
