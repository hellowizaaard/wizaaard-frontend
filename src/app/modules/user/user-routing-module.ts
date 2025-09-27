import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeUrls } from '../../config/route-urls.const';
import { Profile } from './profile/profile';
import { User } from './user';

const routes: Routes = [
  {
    path: '',
    component: User,
    children: [
      {
        path: '',
        component: Profile,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
