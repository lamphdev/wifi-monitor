import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequireLoginGuard } from './auth/guard/require-login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RequireLoginGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
