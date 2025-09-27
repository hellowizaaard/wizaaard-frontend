import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './config/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('./modules/web/web-module').then((m) => m.WebModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./modules/user/user-module').then((w) => w.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
