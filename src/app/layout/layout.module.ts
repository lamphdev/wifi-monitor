import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutService } from './layout.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { 
  constructor(private router: Router, private layoutService: LayoutService) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e) => {
      if ((e as NavigationEnd).url.startsWith('/auth')) {
        layoutService.showHeader = false;
      } else {
        layoutService.showHeader = true;
      }
    });
  }
}
