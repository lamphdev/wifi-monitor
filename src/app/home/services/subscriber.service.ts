import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

import {subscribers} from './data-fake';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor() { }

  getSubscriber(keysearch: string): Observable<any[]> {
    return new BehaviorSubject(
      subscribers.filter(
        el => !keysearch || 
        el.mac_adress === keysearch || 
        el.subnet_name === keysearch ||
        el.broadbrand_account === keysearch)
    ).pipe(delay(1000));
  }
}
