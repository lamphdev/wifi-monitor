import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

import {devices} from './data-fake';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }


  getDevices(): Observable<any[]> {
    return new BehaviorSubject<any[]>(devices).pipe(delay(1000));
  }

}
