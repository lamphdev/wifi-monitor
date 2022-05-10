import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit , OnChanges{

  @Input() devices: any[];
  @Input() loading = false;
  @Input() groupBy = 'none';
  flattern: any[] = [];
  expandSet = new Set<number>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes as any).devices) {
      this.flatternTree();
    }
  }

  flatternTree(): void {
    this.flattern = this.devices.reduce((result, item, idx) => {
      if (item.children) {
        const childItem = item.children.map((el: any) => ({...el, level: 1, parent: idx}))
        return [...result, {...item, key: idx, level: 0, expand: false}, ...childItem]
      }
      return [...result, {...item, key: idx, level: 0, expand: false}];
    }, [])
  }

  changeExpand(key: number, e: boolean): void {
    if (e) {
      this.expandSet.add(key);
    } else {
      this.expandSet.delete(key);
    }
    console.log(this.expandSet);
  }

  classIcon(row: any): any {
    return {
      'text-warning': row.rssi < 60,
      'text-primary': row.rssi <= 70 && row.rssi >= 60,
      'text-success': row.rssi > 70
    }
  }

}
