import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ChartNode } from 'src/app/shared/model/chart-node';
import { environment } from 'src/environments/environment';
import { MqttEventService } from '../../services/mqtt-event.service';


@Pipe({ name: 'apfilter' })
export class ApFilterPipe implements PipeTransform {
  transform(value: any[], ...args: any[]) {
    const keyword = args[0] as string;
    return value.filter(el => {
      return !el.param.manufacturer || el.param.manufacturer?.toLowerCase().includes(keyword) ||
        !el.param.product_class || el.param.product_class?.toLowerCase().includes(keyword) ||
        !el.param.serial_number || el.param.serial_number?.toLowerCase().includes(keyword)
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
  loading = true;

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
    console.log(topic);
    this.apData$ = this.mqttClient.subscribe(topic).pipe(
      map(data => JSON.parse(data.payload.toString())),
      tap(data => {
        console.log(JSON.stringify(data));
        this.loading = false
      }),
      tap(data => this.buildChartTree(data?.objects)),
      take(1)
    );
    const request = {
      "from": this.mqttClient.currentSession,
      "to": this.path,
      "id": 1,
      "type": "get",
      "objects": [
        {
          "name": "ap",
          "params": []
        }
      ]
    }
    this.mqttClient.publish(`${this.GET_AP_TOPIC}/${this.path}`, JSON.stringify(request));
    // this.mqttClient.fakeResponse(topic);
  }

  async buildChartTree(data: any[]): Promise<any> {
    if (!data) {
      return;
    }
    const tree = this.chartData = data.filter(item => item.param.role === 1)
      .map(item => this.findChild(item, data));

    if (tree.length != 0) {
      this.chartData = [
        {
          text: 'Internet',
          children: tree
        }
      ];
    }
  }

  findChild(dataNode: any, source: any[]): ChartNode {
    const children = source.filter(el => el.param.mac_backhaul_ap === dataNode.param.mac_address);
    return {
      ...dataNode,
      text: dataNode.param.product_class,
      type: dataNode.param.backhaul_link,
      mac_address: dataNode.param.mac_address,
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
