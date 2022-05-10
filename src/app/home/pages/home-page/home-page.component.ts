import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { SubscriberService } from '../../services/subscriber.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  subscribers: any[];
  loading = false;

  constructor(private subscribeService: SubscriberService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscribeService.getSubscriber().pipe(
      take(1),
      finalize(() => this.loading = false)
    ).subscribe(res => this.subscribers = res);
  }

}
