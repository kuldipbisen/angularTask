import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * FOOTER COMPONENT
 * 
 * Displays footer information and links
 * Implements lifecycle hooks for logging
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear: number = new Date().getFullYear();
  companyName: string = 'Course Management Platform';
  footerLinks: { label: string; url: string }[] = [];

  constructor() {
    console.log('[Footer] Constructor called');
  }

  ngOnInit(): void {
    console.log('[Footer] ngOnInit called - Component initialized');
    this.footerLinks = [
      { label: 'About Us', url: '/about' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Contact', url: '/contact' }
    ];
    console.log('[Footer] Footer links initialized with', this.footerLinks.length, 'items');
  }

  ngOnDestroy(): void {
    console.log('[Footer] ngOnDestroy called - Component destroyed');
  }
}
