import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

const antdModules = [
  NzLayoutModule,
  NzInputModule,
  NzFormModule,
  NzButtonModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...antdModules
  ],
  exports: [
    ...antdModules
  ]
})
export class SharedModule { }
