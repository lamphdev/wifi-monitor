import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';

const antdModules = [
  NzLayoutModule,
  NzInputModule,
  NzFormModule,
  NzButtonModule,
  NzCardModule,
  NzIconModule,
  NzDividerModule,
  NzTypographyModule,
  NzTableModule,
  NzSelectModule,
  NzModalModule
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
