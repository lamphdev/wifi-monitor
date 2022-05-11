import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, catchError, of, flatMap, mergeMap } from 'rxjs';
import { MqttClientService } from './mqtt-client.service';

const WIFI_GENERAL_TOPIC = "vht/mesh/demo/VTGR123456";

@Injectable({
  providedIn: 'root'
})
export class WifiSettingService {

  constructor(private http: HttpClient, private mqttClient: MqttClientService) { }

  getWifiSetting(type: '2_4ghz' | '5ghz', request: any): Observable<any> {
    let res_2_4ghz: any = {
      "from": "VTGR123456",
      "to": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
      "id": 4,
      "type": "get_response",
      "objects": [
        {
          "name": "wifi24",
          "instance": 1,
          "param": {
            "mode": "b/g/n",
            "channel": 15,
            "band_width": "Auto",
            "power": 99
          }
        }
      ]
    }
    let res5ghz: any = {
      "from": "VTGR123456",
      "to": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
      "id": 5,
      "type": "get_response",
      "objects": [
        {
          "name": "wifi5",
          "instance": 1,
          "param": {
            "mode": "a/n/ac",
            "channel": 56,
            "band_width": "Auto",
            "power": 100
          }
        }
      ]
    }

    this.mqttClient.connect(WIFI_GENERAL_TOPIC)
    return new BehaviorSubject(type === '2_4ghz' ? res_2_4ghz : res5ghz).pipe(delay(500));
  }

  getGeneralSetting(sessionId: string): Observable<any> {

    var payload = {
      "from": sessionId,
      "to": "VTGR123456",
      "id": 3,
      "type": "get",
      "objects": [
        {
          "name": "wifi",
          "params": []
        }
      ]
    }
    return this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload)
      .pipe(mergeMap(_ => {
        console.log("publish to " + WIFI_GENERAL_TOPIC, payload);
        console.log("subcrible to " + WIFI_GENERAL_TOPIC + "/" + sessionId);
        return this.mqttClient.connect(WIFI_GENERAL_TOPIC + "/" + sessionId)
      }))
  }

  settingGeneral(settingRequest: any): Observable<any> {
    return new BehaviorSubject({}).pipe(delay(500));
  }

  settingWifi(settingRequest: any): Observable<any> {
    return new BehaviorSubject({}).pipe(delay(500));
  }

}

var generalResponse = {
  "from": "VTGR123456",
  "to": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
  "id": 3,
  "type": "get_response",
  "objects": [
    {
      "name": "wifi",
      "instance": 1,
      "param": {
        "ssid_index": 1,
        "ssid": "VIETTEL_ABC123",
        "security_mode": "WPA/WPA2",
        "encrypt_mode": "TKIP/AES",
        "preshared_key": "123456a@"
      }
    }
  ]
}

var requestGeneral = {
  "from": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
  "to": "VTGR123456",
  "id": 3,
  "type": "get",
  "objects": [
    {
      "name": "wifi",
      "params": []
    }
  ]
}

var request2_4ghz = {
  "from": "02c29d2a - dbfd - 2d91 - 99c9 - 306d537e9856",
  "to": "VTGR123456",
  "id": 4,
  "type": "get",
  "objects": [
    {
      "name": "wifi24",
      "params": []
    }
  ]
}
