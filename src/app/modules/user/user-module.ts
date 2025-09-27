import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';
import { User } from './user';
import { Profile } from './profile/profile';
import { SharedModule } from '../shared/shared-module';


@NgModule({
  declarations: [
    User,
    Profile
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
