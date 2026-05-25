import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * BREADCRUMBS COMPONENT
 * 
 * Displays navigation breadcrumbs for site hierarchy
 * Shows current location in the application
 */
@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor() {
    console.log('[Breadcrumbs] Constructor called');
  }

  ngOnInit(): void {
    console.log('[Breadcrumbs] ngOnInit called - Component initialized');
    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Courses', url: '/courses' },
      { label: 'All Courses', url: '/courses/all' }
    ];
    console.log('[Breadcrumbs] Breadcrumbs initialized with', this.breadcrumbs.length, 'items');
  }

  ngOnDestroy(): void {
    console.log('[Breadcrumbs] ngOnDestroy called - Component destroyed');
  }
}
