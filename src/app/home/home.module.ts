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
import { SharedModule } from '../shared/shared.module';
import { SubscriberFilterComponent } from './components/subscriber-filter/subscriber-filter.component';
import { SubscriberTableComponent } from './components/subscriber-table/subscriber-table.component';
import { TopologyComponent } from './pages/topology/topology.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { ApFilterPipe, TopologyIndexComponent } from './components/topology-index/topology-index.component';
import { DeviceFilterPipe, TopologyDeviceComponent } from './components/topology-device/topology-device.component';
import { LayoutService } from '../layout/layout.service';
import { MqttModule } from 'ngx-mqtt';
import { ApChartDirective } from './directive/ap-chart.directive';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    HomePageComponent,
    WifiSettingComponent,
    GeneralComponent,
    WifiSettingFormComponent,
    SubscriberFilterComponent,
    SubscriberTableComponent,
    TopologyComponent,
    DeviceTableComponent,
    TopologyIndexComponent,
    TopologyDeviceComponent,
    ApChartDirective,
    ApFilterPipe,
    DeviceFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NzTabsModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzInputModule,
    NzSpinModule,
    NzSwitchModule
  ],
})
export class HomeModule { 
  
}
