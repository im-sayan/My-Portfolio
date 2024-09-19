import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Check if the screen size is mobile
    const isMobileView = window.matchMedia('(max-width: 991px)').matches;

    if (isMobileView && navbarCollapse) {
      navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
          // if (window.getComputedStyle(navbarCollapse).display !== 'none') {
          //   // @ts-ignore: We need to ignore TypeScript errors related to bootstrap
          //   const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          //   bsCollapse.hide();
          // }
        });
      });
    }
  }
}
