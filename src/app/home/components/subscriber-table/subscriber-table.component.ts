import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriber-table',
  templateUrl: './subscriber-table.component.html',
  styleUrls: ['./subscriber-table.component.scss']
})
export class SubscriberTableComponent implements OnInit {

  @Input() subscribers: Array<any> = [];
  @Input() loading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
