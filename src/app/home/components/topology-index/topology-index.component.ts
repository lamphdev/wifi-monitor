import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, debounceTime, finalize, map, Observable, Subject, switchMap, take, takeUntil, tap, throwError, timeout, TimeoutError } from 'rxjs';
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
  loading = false;

  searchString = '';
  searchControl = new FormControl('');

  constructor(private mqttClient: MqttEventService,
    private noti: NzNotificationService) { }

  ngOnInit(): void {
    this.mqttClient.newSession();
    this.subscribeAp();
  }

  /**
   * subscribe ap info from mqtt
   */
  subscribeAp(): void {
    this.loading = true;
    const topic = `${this.GET_AP_TOPIC}/${this.path}/${this.mqttClient.currentSession}`;
    console.log(topic);
    this.apData$ = this.mqttClient.subscribe(topic).pipe(
      timeout(environment.mqttTimeOut),
      map(data => JSON.parse(data.payload.toString())),
      tap(data => {
        console.log(`received: ${JSON.stringify(data)}`);
      }),
      tap(data => this.buildChartTree(data?.objects)),
      take(1),
      catchError((e: any) => {
        if (e instanceof TimeoutError) {
          this.noti.error('Error', environment.timoutMessage);
        }
        return throwError(() => e);
      }),
      finalize(() => this.loading = false)
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
    const payloadPublish = JSON.stringify(request);
    console.log(`publish ${payloadPublish}`)
    this.mqttClient.publish(`${this.GET_AP_TOPIC}/${this.path}`, payloadPublish);
    //this.mqttClient.fakeResponse(topic);
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
