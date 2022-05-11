import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timeStamp } from 'console';
import { debounceTime, finalize, Observable, Subject, take, takeUntil } from 'rxjs';
import { SubscriberService } from '../../services/subscriber.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit , OnDestroy{

  subscribers: any[];
  loading = false;
  searchControl = new FormControl('');
  unsubscribe$ = new Subject<void>();

  constructor(private subscribeService: SubscriberService) { }

  ngOnInit(): void {
    this.getSubscriber('');
    this.searchControlHandle();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchControlHandle(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.getSubscriber(value);
    })
  }

  getSubscriber(keyword: string): void {
    this.loading = true;
    this.subscribeService.getSubscriber(keyword).pipe(
      take(1),
      finalize(() => this.loading = false)
    ).subscribe(res => this.subscribers = res);
  }

}
