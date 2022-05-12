import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WifiSettingService } from '../../services/wifi-setting.service';

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

  common_config = {
    "ENCRYPT_MODE": [
      "TKIP",
      "AES",
    ],
    "WIFI_MODE": [
      "b/g/n",
      "a/n/ac"
    ],
    "CHANNEL": [
      "15",
      "56"
    ],
    "SECURITY_MODE": [
      "WPA",
      "WPA2",
      "WPA3",
    ]
  };

  constructor(private wifiSetting: WifiSettingService) { }

  ngOnInit(): void {
    this.onClose.subscribe(evt => {
      this.close(evt);
    })
  }

  close(evt: any) {

  }

}
