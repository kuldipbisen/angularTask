import { Component, Input, ViewContainerRef, ViewChild, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SIMPLE WIDGET COMPONENT (to be dynamically loaded)
 */
@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="widget">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
      <div class="widget-content">
        {{ content }}
      </div>
    </div>
  `,
  styles: [`
    .widget {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
      margin: 8px 0;
      background: #f9f9f9;
    }

    h4 {
      margin: 0 0 8px 0;
      color: #333;
    }

    p {
      margin: 0 0 8px 0;
      font-size: 12px;
      color: #666;
    }

    .widget-content {
      background: white;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
    }
  `]
})
export class WidgetComponent {
  @Input() title: string = 'Widget';
  @Input() description: string = 'A dynamically loaded widget';
  @Input() content: string = 'Widget content';
}

/**
 * BUTTON WIDGET COMPONENT (to be dynamically loaded)
 */
@Component({
  selector: 'app-button-widget',
  standalone: true,
  template: `
    <div class="button-widget">
      <h4>{{ title }}</h4>
      <button (click)="handleClick()">{{ buttonText }}</button>
      <p *ngIf="clickCount > 0">Clicked {{ clickCount }} times</p>
    </div>
  `,
  styles: [`
    .button-widget {
      border: 1px solid #007bff;
      border-radius: 4px;
      padding: 12px;
      margin: 8px 0;
      background: #f0f8ff;
      text-align: center;
    }

    h4 {
      margin: 0 0 8px 0;
      color: #007bff;
    }

    button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background: #0056b3;
    }

    p {
      margin: 8px 0 0 0;
      font-size: 12px;
      color: #666;
    }
  `]
})
export class ButtonWidgetComponent {
  @Input() title: string = 'Action Button';
  @Input() buttonText: string = 'Click Me';

  clickCount: number = 0;

  handleClick(): void {
    this.clickCount++;
    console.log(`Button clicked! Total clicks: ${this.clickCount}`);
  }
}

/**
 * CARD WIDGET COMPONENT (to be dynamically loaded)
 */
@Component({
  selector: 'app-card-widget',
  standalone: true,
  template: `
    <div class="card-widget">
      <div class="card-header">{{ cardTitle }}</div>
      <div class="card-body">{{ cardBody }}</div>
      <div class="card-footer">
        <small>{{ cardFooter }}</small>
      </div>
    </div>
  `,
  styles: [`
    .card-widget {
      border: 1px solid #28a745;
      border-radius: 4px;
      overflow: hidden;
      margin: 8px 0;
    }

    .card-header {
      background: #28a745;
      color: white;
      padding: 10px;
      font-weight: bold;
    }

    .card-body {
      padding: 12px;
      background: white;
    }

    .card-footer {
      background: #f0f0f0;
      padding: 8px 12px;
      color: #666;
    }
  `]
})
export class CardWidgetComponent {
  @Input() cardTitle: string = 'Card Title';
  @Input() cardBody: string = 'Card Body';
  @Input() cardFooter: string = 'Card Footer';
}

/**
 * DYNAMIC COMPONENTS DEMO
 * 
 * This component demonstrates:
 * - Dynamic component loading at runtime
 * - Using ViewContainerRef to create dynamic components
 * - Creating and destroying components programmatically
 * - Passing input data to dynamically created components
 * - Managing component lifecycle in dynamic scenarios
 * 
 * Learning Goals:
 * - Understand how to load components dynamically
 * - Learn ViewContainerRef and how to use it
 * - Master component instantiation and lifecycle
 * - Implement dynamic component communication
 * - Handle dynamic component cleanup
 */
// @ts-ignore - Components are created dynamically with createComponent()
@Component({
  selector: 'app-dynamic-components-demo',
  standalone: true,
  imports: [CommonModule, WidgetComponent, ButtonWidgetComponent, CardWidgetComponent],
  templateUrl: './dynamic-components-demo.component.html',
  styleUrls: ['./dynamic-components-demo.component.scss']
})
export class DynamicComponentsDemoComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) 
  dynamicContainer?: ViewContainerRef;

  dynamicComponentCount: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Add a basic widget component dynamically
   * 
   * This demonstrates:
   * - Using ViewContainerRef.createComponent()
   * - Creating component references
   * - Setting input properties on dynamic components
   */
  addWidget(): void {
    if (!this.dynamicContainer) return;

    const componentRef = this.dynamicContainer.createComponent(WidgetComponent);
    
    // Set input properties
    componentRef.instance.title = `Widget ${this.dynamicComponentCount + 1}`;
    componentRef.instance.description = 'Dynamically created widget';
    componentRef.instance.content = `This is dynamic widget #${this.dynamicComponentCount + 1}`;

    this.dynamicComponentCount++;
    this.cdr.detectChanges();

    console.log(`Widget added. Total components: ${this.dynamicComponentCount}`);
  }

  /**
   * Add a button widget component dynamically
   */
  addButtonWidget(): void {
    if (!this.dynamicContainer) return;

    const componentRef = this.dynamicContainer.createComponent(ButtonWidgetComponent);
    
    // Set input properties
    componentRef.instance.title = `Button Widget ${this.dynamicComponentCount + 1}`;
    componentRef.instance.buttonText = 'Dynamic Button';

    this.dynamicComponentCount++;
    this.cdr.detectChanges();

    console.log(`Button widget added. Total components: ${this.dynamicComponentCount}`);
  }

  /**
   * Add a card widget component dynamically
   */
  addCardWidget(): void {
    if (!this.dynamicContainer) return;

    const componentRef = this.dynamicContainer.createComponent(CardWidgetComponent);
    
    // Set input properties
    componentRef.instance.cardTitle = `Dynamic Card ${this.dynamicComponentCount + 1}`;
    componentRef.instance.cardBody = 'This card was created dynamically at runtime using ViewContainerRef.';
    componentRef.instance.cardFooter = `Created: ${new Date().toLocaleTimeString()}`;

    this.dynamicComponentCount++;
    this.cdr.detectChanges();

    console.log(`Card widget added. Total components: ${this.dynamicComponentCount}`);
  }

  /**
   * Clear all dynamically created components
   * 
   * This demonstrates:
   * - Destroying all components in a container
   * - Cleaning up resources
   * - Resetting the container
   */
  clearAllWidgets(): void {
    if (!this.dynamicContainer) return;

    this.dynamicContainer.clear();
    this.dynamicComponentCount = 0;
    this.cdr.detectChanges();

    console.log('All components cleared');
  }
}
