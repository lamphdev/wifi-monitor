import { Component } from '@angular/core';
import { LayoutService } from './layout/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wifi-monitor';

  constructor(public layoutService: LayoutService) {

  }
}
