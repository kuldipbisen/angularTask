import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * LIFECYCLE HOOKS DEMO COMPONENT
 * 
 * This component demonstrates all important Angular lifecycle hooks:
 * - constructor: Component instantiation
 * - ngOnInit: Initialize component after properties are initialized
 * - ngOnChanges: React to input property changes
 * - ngAfterViewInit: After view and child views are initialized
 * - ngOnDestroy: Cleanup before component is destroyed
 * 
 * Learning Goals:
 * - Understand the component lifecycle phases
 * - Know when to use each lifecycle hook
 * - Manage initialization and cleanup
 * - Handle input property changes
 * - Access template elements after rendering
 */
@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lifecycle-demo.component.html',
  styleUrls: ['./lifecycle-demo.component.scss']
})
export class LifecycleDemoComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  // Input property
  @Input() initialName: string = 'Angular';

  // Template reference
  @ViewChild('myElement') myElement?: ElementRef;

  // Component properties
  name: string = 'Angular Component';
  counter: number = 0;
  isInitialized: boolean = false;
  elementText: string = '';
  lifecycleLog: string[] = [];

  private callCount = 1;

  /**
   * Constructor - Called when Angular instantiates the component class
   * Use for: Very basic initialization, dependency injection
   * Avoid: Complex logic, property access
   */
  constructor() {
    this.logEvent('constructor called');
  }

  /**
   * ngOnInit - Called once after component is initialized
   * Use for: Fetch data, set up component, initialize properties
   * Called: After the first ngOnChanges() and after ngAfterContentInit()
   */
  ngOnInit(): void {
    this.logEvent('ngOnInit called');
    this.isInitialized = true;

    // Simulating data fetch or initialization
    setTimeout(() => {
      this.logEvent('ngOnInit - async operation completed');
    }, 1000);
  }

  /**
   * ngOnChanges - Called before ngOnInit and when input properties change
   * Use for: React to changes in @Input properties
   * Parameter: SimpleChanges object with previous and current values
   */
  ngOnChanges(changes: SimpleChanges): void {
    const timestamp = new Date().toLocaleTimeString();
    
    if (changes['initialName']) {
      this.logEvent(`ngOnChanges called - initialName changed at ${timestamp}`);
      const change = changes['initialName'];
      this.logEvent(`  Previous: ${change.previousValue}, Current: ${change.currentValue}`);
    }

    if (changes['counter']) {
      this.logEvent(`ngOnChanges called - counter changed at ${timestamp}`);
    }
  }

  /**
   * ngAfterViewInit - Called after view and all child views are initialized
   * Use for: Access template elements (ViewChild, ViewChildren), DOM manipulation
   * Called: After ngAfterContentInit()
   */
  ngAfterViewInit(): void {
    this.logEvent('ngAfterViewInit called');
    
    // Now we can safely access template elements
    if (this.myElement) {
      this.elementText = this.myElement.nativeElement.textContent;
      this.logEvent(`  Element text retrieved: "${this.elementText}"`);
    }
  }

  /**
   * ngOnDestroy - Called just before component is destroyed
   * Use for: Cleanup, unsubscribe from observables, remove event listeners
   * Called: When navigating away or component is removed
   */
  ngOnDestroy(): void {
    this.logEvent('ngOnDestroy called - Component is being destroyed!');
    // Cleanup logic would go here
  }

  private logEvent(event: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.lifecycleLog.unshift(`[${this.callCount++}] ${timestamp}: ${event}`);
  }

  clearLog(): void {
    this.lifecycleLog = [];
    this.callCount = 1;
  }
}
