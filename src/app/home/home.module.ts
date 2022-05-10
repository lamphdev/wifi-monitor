import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WifiSettingComponent } from './pages/wifi-setting/wifi-setting.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GeneralComponent } from './pages/wifi-setting/general/general.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { WifiSettingFormComponent } from './pages/wifi-setting/wifi-setting-form/wifi-setting-form.component';


@NgModule({
  declarations: [
    HomePageComponent,
    WifiSettingComponent,
    GeneralComponent,
    WifiSettingFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NzTabsModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzSwitchModule,
  ]
})
export class HomeModule { }
