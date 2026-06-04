import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * BREADCRUMBS COMPONENT
 * 
 * Displays navigation breadcrumbs for site hierarchy
 * Shows current location in the application
 * Demonstrates lifecycle hooks: constructor, ngOnInit, ngOnDestroy
 */
@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbText = 'Courses';
  componentId = Math.random();

  constructor() {
    console.log(`[Breadcrumbs ${this.componentId}] Constructor called - component created`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnInit(): void {
    console.log(`[Breadcrumbs ${this.componentId}] ngOnInit called - component initialized`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnDestroy(): void {
    console.log(`[Breadcrumbs ${this.componentId}] ngOnDestroy called - component destroyed`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }
}
