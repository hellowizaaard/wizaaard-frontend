import { Component } from '@angular/core';
import { routeUrls } from '../../config/route-urls.const';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  routeUrls:any = routeUrls;
}
