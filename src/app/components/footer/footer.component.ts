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
  constructor() {
    console.log('[Footer] Constructor called');
  }

  ngOnInit(): void {
    console.log('[Footer] ngOnInit called - Component initialized');
  }

  ngOnDestroy(): void {
    console.log('[Footer] ngOnDestroy called - Component destroyed');
  }
}
