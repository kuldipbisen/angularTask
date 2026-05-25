/**
 * COMPONENT LEARNING MODULE - INDEX
 * 
 * This file exports all the learning components for easy import
 */

// Basic Components
export { CounterComponent } from './1-basic-components/counter.component';
export { TodoListComponent } from './1-basic-components/todo-list.component';

// Component Communication
export { ProductCardComponent, type Product } from './2-component-communication/product-card.component';
export { ProductListComponent } from './2-component-communication/product-list.component';

// Lifecycle Hooks
export { LifecycleDemoComponent } from './3-lifecycle-hooks/lifecycle-demo.component';

// Template References
export { TemplateReferenceComponent } from './4-template-reference/template-reference-demo.component';

// Custom Events
export { EventEmitterDemoComponent, NotificationComponent } from './5-custom-events/event-emitter-demo.component';

// Dynamic Components
export { DynamicComponentsDemoComponent, WidgetComponent, ButtonWidgetComponent, CardWidgetComponent } from './6-dynamic-components/dynamic-components-demo.component';
