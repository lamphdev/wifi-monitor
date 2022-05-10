import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from './general/general.component';

@Component({
  selector: 'app-wifi-setting',
  templateUrl: './wifi-setting.component.html',
  styleUrls: ['./wifi-setting.component.scss'],
})
export class WifiSettingComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
