import { Component } from '@angular/core';
import { routeUrls } from '../../config/route-urls.const';

@Component({
  selector: 'app-web',
  standalone: false,
  templateUrl: './web.html',
  styleUrl: './web.css'
})
export class Web {
  routeUrls:any = routeUrls;
}
