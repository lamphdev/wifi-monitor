import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';

import {devices, get_host_response} from './data-fake';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }


  getDevices(): Observable<any[]> {
    return new BehaviorSubject<any>(get_host_response).pipe(
      delay(1000),
      map(res => res.objects)
    );
  }

}
