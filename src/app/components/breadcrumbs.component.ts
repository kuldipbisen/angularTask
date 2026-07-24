import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="breadcrumbs">
      <div class="breadcrumbs-content">
        <a *ngFor="let item of items; let last = last" 
           [href]="item.url || '#'"
           [class.active]="item.active || last">
          {{ item.label }}
          <span *ngIf="!last" class="separator">/</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      background-color: #f5f5f5;
      padding: 1rem 2rem;
      border-bottom: 1px solid #ddd;
    }
    
    .breadcrumbs-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 0.5rem;
      font-size: 0.9rem;
      align-items: center;
    }
    
    a {
      color: #333;
      text-decoration: none;
      transition: color 0.3s;
      font-weight: 500;
    }
    
    a:hover:not(.active) {
      color: #667eea;
      text-decoration: underline;
    }
    
    a.active {
      color: #333;
      font-weight: 600;
      cursor: default;
    }
    
    .separator {
      margin: 0 0.5rem;
      color: #999;
    }
  `]
})
export class BreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [
    { label: 'Home', url: '#' },
    { label: 'Courses', url: '#' },
    { label: 'All Courses', active: true }
  ];
}
