import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wifi-setting',
  templateUrl: './wifi-setting.component.html',
  styleUrls: ['./wifi-setting.component.scss'],
})
export class WifiSettingComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  tabs = [
    {
      name: 'General Setting',
      id: 'general',
    },
    {
      name: '2.4Ghz Setting',
      id: '2_4ghz',
    },
    {
      name: '5Ghz Setting',
      id: '5ghz',
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.onClose.subscribe(evt => {
      this.close(evt);
    })
  }

  close(evt: any) {

  }

}
