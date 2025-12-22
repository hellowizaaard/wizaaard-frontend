import { Component, HostListener } from '@angular/core';
import { routeUrls } from '../../../config/route-urls.const';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  routeUrls:any = routeUrls;
  user:any = null;

  constructor(
    private auth: AuthService
  ){
    
  }

  ngOnInit(): void {
    if(this.auth.authCheck()){
      this.user = this.auth.getUser();
      // console.log(this.user)
    }
  }

  logout():void {
    this.auth.logout();
  }
menuOpen = false;

toggleMenu(event: Event) {
  event.stopPropagation();
  this.menuOpen = !this.menuOpen;
}

navigate(route: string) {
  this.menuOpen = false;
  // this.router.navigate([route]);
}

// Close on outside click
@HostListener('document:click')
closeMenu() {
  this.menuOpen = false;
}


}
