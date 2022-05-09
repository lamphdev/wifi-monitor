import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

import {subscribers} from './data-fake';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor() { }

  getSubscriber(input: string): Observable<any[]> {
    const keysearch = input?.toLowerCase();
    return new BehaviorSubject(
      subscribers.filter(
        el => !keysearch || 
        el.mac_adress?.toLowerCase().includes(keysearch) || 
        el.subnet_name?.toLowerCase().includes(keysearch) ||
        el.broadbrand_account?.toLowerCase().includes(keysearch) ||
        el.gateway_alias === keysearch ||
        el.gateway_sn?.toLowerCase().includes(keysearch))
    ).pipe(delay(1000));
  }
}
