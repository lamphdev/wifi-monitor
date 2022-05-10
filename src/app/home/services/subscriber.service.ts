import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

import {subscribers} from './data-fake';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor() { }

  getSubscriber(): Observable<any[]> {
    return new BehaviorSubject(subscribers).pipe(delay(1000));
  }
}
