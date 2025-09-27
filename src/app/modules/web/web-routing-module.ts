import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Web } from './web';
import { Home } from './home/home';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';
import { Faq } from './faq/faq';
import { TermsConditions } from './terms-conditions/terms-conditions';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { routeUrls } from '../../config/route-urls.const';

const routes: Routes = [
  {
    path: routeUrls.home,
    component: Web,
    children: [
      {
        path: routeUrls.home,
        component: Home,
      },
      {
        path: routeUrls.aboutUs,
        component: AboutUs,
      },
      {
        path: routeUrls.contact,
        component: Contact,
      },
      {
        path: routeUrls.faq,
        component: Faq,
      },
      {
        path: routeUrls.termsConditions,
        component: TermsConditions,
      },
      {
        path: routeUrls.login,
        component: Login,
      },
      {
        path: routeUrls.register,
        component: Register,
      },
      {
        path: routeUrls.forgotPassword,
        component: ForgotPassword,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
