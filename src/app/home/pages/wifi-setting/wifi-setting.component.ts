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
      { value: "TKIP", disable: true },
      { value: "AES", disable: false },
    ],
    "SECURITY_MODE": [
      { value: "OPEN", disable: true },
      { value: "WPAPSK", disable: true },
      { value: "WPA2PSK", disable: false },
    ],
    '2_4ghz': {
      mode: [
        'B only',
        'G only',
        'G/N mixed',
        'B/G mixed',
        'B/N/G mixed'
      ],
      band_wide: [
        '20MHz',
        '40MHz',
        '20/40MHz',
      ],
      chanel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      power: [25, 50, 75, 100]
    },
    '5ghz': {
      mode: [
        'A only',
        'A/N mixed',
        'A/N/AC mixed',
        'N/AC mixed',
      ],
      band_wide: [
        '20MHz',
        '40MHz',
        '80MHz',
        '20/40/80MHz',
      ],
      chanel: [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 149, 153, 157, 161],
      power: [25, 50, 75, 100]
    }
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
