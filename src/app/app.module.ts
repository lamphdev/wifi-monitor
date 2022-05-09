import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

registerLocaleData(en);

// export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
//   hostname: 'broker.mqttdashboard.com',
//   port: 8000,
//   path: '/mqtt'
// };
import { environment } from 'src/environments/environment';

registerLocaleData(en);

const mqttConfig: IMqttServiceOptions = {
  hostname: environment.mqttConfig.hostname,
  protocol: environment.mqttConfig.protocol as ('ws'|'wss'),
  port: environment.mqttConfig.port,
  path: environment.mqttConfig.path
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MqttModule.forRoot(mqttConfig),
    BrowserAnimationsModule,
    LayoutModule,
    // MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
