import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './1-basic-components/counter.component';
import { TodoListComponent } from './1-basic-components/todo-list.component';
import { ProductListComponent } from './2-component-communication/product-list.component';
import { LifecycleDemoComponent } from './3-lifecycle-hooks/lifecycle-demo.component';
import { TemplateReferenceComponent } from './4-template-reference/template-reference-demo.component';
import { EventEmitterDemoComponent } from './5-custom-events/event-emitter-demo.component';
import { DynamicComponentsDemoComponent } from './6-dynamic-components/dynamic-components-demo.component';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  component: any;
  isActive: boolean;
}

/**
 * LEARNING MODULES SHOWCASE COMPONENT
 * 
 * This component demonstrates all Angular component learning concepts:
 * 1. Design and Create Components
 * 2. Component Lifecycle
 * 3. Component Interaction
 * 4. Dynamic Components
 * 
 * Navigate through different modules to see practical examples.
 */
@Component({
  selector: 'app-learning-modules',
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    TodoListComponent,
    ProductListComponent,
    LifecycleDemoComponent,
    TemplateReferenceComponent,
    EventEmitterDemoComponent,
    DynamicComponentsDemoComponent
  ],
  templateUrl: './learning-modules.component.html',
  styleUrls: ['./learning-modules.component.scss']
})
export class LearningModulesComponent {
  modules: LearningModule[] = [
    {
      id: 'basic',
      title: '1. Basic Components',
      description: 'Learn how to create and design Angular components with property binding, event binding, and conditional rendering.',
      component: null,
      isActive: true
    },
    {
      id: 'communication',
      title: '2. Component Communication',
      description: 'Master parent-child component interaction using @Input(), @Output(), and EventEmitter.',
      component: null,
      isActive: false
    },
    {
      id: 'lifecycle',
      title: '3. Lifecycle Hooks',
      description: 'Understand Angular component lifecycle phases and when to use each lifecycle hook.',
      component: null,
      isActive: false
    },
    {
      id: 'references',
      title: '4. Template References',
      description: 'Work with template reference variables and @ViewChild/@ViewChildren decorators.',
      component: null,
      isActive: false
    },
    {
      id: 'events',
      title: '5. Custom Events',
      description: 'Create and emit custom events using EventEmitter for advanced component communication.',
      component: null,
      isActive: false
    },
    {
      id: 'dynamic',
      title: '6. Dynamic Components',
      description: 'Load and manage components dynamically at runtime using ViewContainerRef.',
      component: null,
      isActive: false
    }
  ];

  get activeModule(): LearningModule {
    return this.modules.find(m => m.isActive) || this.modules[0];
  }

  selectModule(moduleId: string): void {
    this.modules.forEach(m => m.isActive = m.id === moduleId);
    console.log(`Switched to module: ${moduleId}`);
  }
}
