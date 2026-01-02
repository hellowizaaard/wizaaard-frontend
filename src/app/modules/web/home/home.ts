import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
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
}
