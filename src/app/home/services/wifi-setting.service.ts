import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { MqttClientService } from './mqtt-client.service';

const DEVICE = 'VTGR2A27E658';
const WIFI_GENERAL_TOPIC = 'vht/mesh/demo/' + DEVICE;

@Injectable({
  providedIn: 'root'
})
export class WifiSettingService {

  constructor(private mqttClient: MqttClientService) { }

  getWifiSetting(type: '2_4ghz' | '5ghz', sessionId: string): Observable<any> {
    // sessionId = type + '_' +  sessionId.split('-')[0];
    var payload = {
      "from": sessionId,
      "to": DEVICE,
      "id": type === '2_4ghz' ? 4 : 5,
      "type": "get",
      "objects": [
        {
          "name": type == '2_4ghz' ? "wifi24" : "wifi5",
          "params": []
        }
      ]
    }

    console.log("wifi" + type + " subscribe ", WIFI_GENERAL_TOPIC + "/" + sessionId);
    return this.mqttClient.connect(WIFI_GENERAL_TOPIC + '/' + sessionId).pipe(
      doOnSubscribe(() => {
        setTimeout(() => {
          console.log("wifi" + type + " publish ", WIFI_GENERAL_TOPIC, JSON.stringify(payload));
          this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload).subscribe();
          // this.mqttClient.publish(WIFI_GENERAL_TOPIC + '/' + sessionId, type == '2_4ghz'? res_2_4ghz : res5ghz).subscribe() //remove it
        }, 100);
      })
    );  
  }

  getGeneralSetting(sessionId: string): Observable<any> {
    // sessionId = 'general_' + sessionId.split('-')[0];
    var payload = {
      "from": sessionId,
      "to": DEVICE,
      "id": 3,
      "type": "get",
      "objects": [
        {
          "name": "wifi",
          "params": []
        }
      ]
    }
    console.log("general subcrible " , WIFI_GENERAL_TOPIC + "/" + sessionId);
    return this.mqttClient.connect(WIFI_GENERAL_TOPIC + '/' + sessionId).pipe(
      doOnSubscribe(() => {
        setTimeout(() => {
          console.log("general publish", WIFI_GENERAL_TOPIC, JSON.stringify(payload));
          this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload).subscribe();
        }, 100);
      })
    );

  }

  settingGeneral(formValue: any, sessionId: string): Observable<any> {

    // sessionId = 'setting_general_' + sessionId.split('-')[0];

    let payload = {
      "from": sessionId,
      "to": DEVICE,
      "id": 3,
      "type": "set",
      "objects": [
        {
          "name": "wifi",
          "instance": 1,
          "param": {
            "ssid_index": 1,
            ...formValue,
            enable: formValue.enable ? 1 : 0,
          }
        }
      ]
    }

    console.log("setting general subcrible " , WIFI_GENERAL_TOPIC + "/" + sessionId);
    return this.mqttClient.connect(WIFI_GENERAL_TOPIC + '/' + sessionId).pipe(
      doOnSubscribe(() => {
        console.log("setting general publish", WIFI_GENERAL_TOPIC, payload);
        this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload).subscribe();
      })
    );
  }

  settingWifi(type: string, formValue: any, sessionId: string): Observable<any> {

    // sessionId = 'setting_' + type + '_' + sessionId.split('-')[0];

    let payload = {
      "from": sessionId,
      "to": DEVICE,
      "id": '2_4ghz' ? 4 : 5,
      "type": "set",
      "objects": [
        {
          "name": type == '2_4ghz' ? "wifi24" : "wifi5",
          "instance": 1,
          "param": {
            "ssid_index": 1,
            ...formValue,
            enable: formValue.enable ? 1 : 0
          }
        }
      ]
    }
    console.log("setting wifi subcrible" , WIFI_GENERAL_TOPIC + "/" + sessionId);
    return this.mqttClient.connect(WIFI_GENERAL_TOPIC + '/' + sessionId).pipe(
      doOnSubscribe(() => {
        console.log("setting wifi publish", WIFI_GENERAL_TOPIC, payload);
        this.mqttClient.publish(WIFI_GENERAL_TOPIC, payload).subscribe();
      })
    );  
  }

}

export function doOnSubscribe<T>(onSubscribe: () => void): (source: Observable<T>) =>  Observable<T> {
  return function inner(source: Observable<T>): Observable<T> {
      return defer(() => {
        onSubscribe();
        return source;
      });
  };
}

let res_2_4ghz: any = {
  "from": DEVICE,
  "to": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
  "id": 4,
  "type": "get_response",
  "objects": [
    {
      "enable": true,
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
  "from": DEVICE,
  "to": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
  "id": 5,
  "type": "get_response",
  "objects": [
    {
      "enable": true,
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
  "from": DEVICE,
  "to": "02c29d2a-dbfd-2d91-99c9-306d537e9856",
  "id": 3,
  "type": "get_response",
  "objects": [
    {
      "name": "wifi",
      "instance": 1,
      "param": {
        "enable": true,
        "ssid_index": 1,
        "ssid": "VIETTEL_ABC123",
        "security_mode": "WPA",
        "encrypt_mode": "AES",
        "preshared_key": "123456a@"
      }
    }
  ]
}