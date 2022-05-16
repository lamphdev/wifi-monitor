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
        {label: 'B only', value: ''},
        {label: 'G only', value: ''},
        {label: 'G/N mixed', value: 'G/N mixed'},
        {label: 'B/G mixed', value: 'B/G mixed'},
        {label: 'B/G/N mixed', value: 'B/G/N mixed'},

      ],
      band_wide: [
        {label: 'Auto', value: 'Auto'},
        {label: '20 MHz', value: '20MHz'},
        {label: '40 MHz', value: '40MHz'},
        {label: '20/40 MHz', value: '20/40MHz'},
      ],
      chanel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      power: [25, 50, 75, 100]
    },
    '5ghz': {
      mode: [
        {label: 'A only', value: ''},
        {label: 'A/N mixed', value: 'A/N mixed'},
        {label: 'A/N/AC mixed', value: 'A/N/AC mixed'},
        {label: 'N/AC mixed', value: 'N/AC mixed'},
      ],
      band_wide: [
        {label: 'Auto', value: 'Auto'},
        {label: '20 MHz', value: '20MHz'},
        {label: '40 MHz', value: '40MHz'},
        {label: '80 MHz', value: '80MHz'},
        {label: '20/40/80 MHz', value: '20/40MHz'},
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
