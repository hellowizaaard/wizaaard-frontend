import { Component, AfterViewInit } from '@angular/core';
import { NgClass,CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [CommonModule],
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {

  ngAfterViewInit(): void {
    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector<HTMLElement>('.faq-question');

      btn?.addEventListener('click', () => {
        faqItems.forEach(i => {
          if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    });
  }
   menuItems = [
    { label: 'Resume', image: '/img/resume.png' },
    { label: 'Cards', image: '/img/cards.png' },
    { label: 'Jobs', image: '/img/jobs.png' },
    { label: 'Landingpage', image: '/img/landingpage.png' },
    { label: 'Templates', image: '/img/templates.png' },
    { label: 'Mentors', image: '/img/mentors.png' }
  ];
  
  activeMenu = this.menuItems[0].label;
  activeImage = this.menuItems[0].image;

  selectMenu(item: any) {
    this.activeMenu = item.label;
    this.activeImage = item.image;
  }
}
