import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing-module';
import { Web } from './web';
import { Home } from './home/home';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';
import { Faq } from './faq/faq';
import { TermsConditions } from './terms-conditions/terms-conditions';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';


@NgModule({
  declarations: [
    Web,
    Home,
    AboutUs,
    Contact,
    Faq,
    TermsConditions,
    Login,
    Register,
    ForgotPassword
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class WebModule { }
