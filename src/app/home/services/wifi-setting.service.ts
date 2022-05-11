import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, catchError, of, flatMap, mergeMap } from 'rxjs';
import { MqttClientService } from './mqtt-client.service';

const WIFI_GENERAL_TOPIC = "vht/mesh/demo/VTGR123456";
const WIFI_SETTING_TOPIC = "vht/mesh/demo/VTGR123456";

@Injectable({
  providedIn: 'root'
})
export class WifiSettingService {

  constructor(private http: HttpClient, private mqttClient: MqttClientService) { }

  getWifiSetting(type: '2_4ghz' | '5ghz', sessionId: string): Observable<any> {

    var payload = {
      "from": sessionId,
      "to": "VTGR123456",
      "id": '2_4ghz' ? 4 : 5,
      "type": "get",
      "objects": [
        {
          "name": type == '2_4ghz' ? "wifi24" : "wifi",
          "params": []
        }
      ]
    }

    this.mqttClient.connect(WIFI_GENERAL_TOPIC)
    return this.mqttClient.publish(WIFI_SETTING_TOPIC, payload)
      .pipe(mergeMap(_ => {
        console.log("wifi" + type + " publish " + WIFI_SETTING_TOPIC, payload);
        console.log("wifi" + type + " subcrible " + WIFI_SETTING_TOPIC + "/" + sessionId);
        return this.mqttClient.connect(WIFI_SETTING_TOPIC + "/" + sessionId)
      }))
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
        console.log("general publish" + WIFI_GENERAL_TOPIC, payload);
        console.log("general subcrible " + WIFI_GENERAL_TOPIC + "/" + sessionId);
        return this.mqttClient.connect(WIFI_GENERAL_TOPIC + "/" + sessionId)
      }))
  }

  settingGeneral(formValue: any, sessionId: string): Observable<any> {

    let payload = {
      "from": sessionId,
      "to": "VTGR123456",
      "id": 3,
      "type": "set",
      "objects": [
        {
          "name": "wifi",
          "instance": 1,
          "param": {
            "ssid_index": 1,
            ...formValue
          }
        }
      ]
    }

    return this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload)
      .pipe(mergeMap(_ => {
        console.log("setting general publish" + WIFI_GENERAL_TOPIC, payload);
        console.log("setting general subcrible " + WIFI_GENERAL_TOPIC + "/" + sessionId);
        return this.mqttClient.connect(WIFI_GENERAL_TOPIC + "/" + sessionId)
      }))
  }

  settingWifi(type: string, formValue: any, sessionId: string): Observable<any> {

    let payload = {
      "from": sessionId,
      "to": "VTGR123456",
      "id": '2_4ghz' ? 4 : 5,
      "type": "set",
      "objects": [
        {
          "name": type == '2_4ghz' ? "wifi24" : "wifi",
          "instance": 1,
          "param": {
            "ssid_index": 1,
            ...formValue
          }
        }
      ]
    }
    return this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload)
      .pipe(mergeMap(_ => {
        console.log("setting wifi publish" + WIFI_GENERAL_TOPIC, payload);
        console.log("setting wifi subcrible " + WIFI_GENERAL_TOPIC + "/" + sessionId);
        return this.mqttClient.connect(WIFI_GENERAL_TOPIC + "/" + sessionId)
      }))
  }

}


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