import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * BASIC COMPONENT EXAMPLE
 * 
 * This component demonstrates the fundamental structure of an Angular component:
 * - Component decorator with metadata (selector, template, styles)
 * - Component class with properties and methods
 * - Data binding in templates
 * 
 * Learning Goals:
 * - Understand component structure
 * - Learn property binding and event binding
 * - Work with component state
 */
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  // Component state
  count: number = 0;

  // Methods that update component state
  increment(): void {
    this.count++;
  }

  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  reset(): void {
    this.count = 0;
  }
}
