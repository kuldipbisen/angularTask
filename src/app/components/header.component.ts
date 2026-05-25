import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HEADER COMPONENT
 * 
 * Displays the main navigation header with branding and title
 * Implements lifecycle hooks for logging
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string = 'Course Management Platform';
  subtitle: string = 'Manage and browse available courses';

  constructor() {
    console.log('[Header] Constructor called');
  }

  ngOnInit(): void {
    console.log('[Header] ngOnInit called - Component initialized');
    console.log('[Header] Title set to:', this.title);
  }

  ngOnDestroy(): void {
    console.log('[Header] ngOnDestroy called - Component destroyed');
  }
}
