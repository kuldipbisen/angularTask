# Angular Components - Quick Reference Guide

## 🎯 Quick Checklist: What You Should Know

### ✅ Basic Components
- [ ] Understand component structure (decorator, template, class, styles)
- [ ] Know how to create a component
- [ ] Understand property binding `{{ value }}`
- [ ] Understand event binding `(click)="method()"`
- [ ] Use *ngIf for conditional rendering
- [ ] Use *ngFor for list rendering
- [ ] Understand component state management

### ✅ Component Communication
- [ ] Understand parent-child relationships
- [ ] Use @Input() to pass data down
- [ ] Use @Output() and EventEmitter to pass events up
- [ ] Know when to use each pattern
- [ ] Understand difference between @Input and @Output
- [ ] Be able to implement two-way communication

### ✅ Lifecycle Hooks
- [ ] Know the order of lifecycle hooks
- [ ] Understand purpose of each hook
- [ ] Use ngOnInit for initialization
- [ ] Use ngOnChanges for input changes
- [ ] Use ngAfterViewInit for DOM access
- [ ] Use ngOnDestroy for cleanup
- [ ] Know how to implement lifecycle interfaces

### ✅ Template References
- [ ] Use #variable syntax in templates
- [ ] Use @ViewChild to get element reference
- [ ] Use @ViewChildren to get multiple references
- [ ] Access DOM elements via ElementRef
- [ ] Know when to use references vs. data binding
- [ ] Be able to access form values

### ✅ Custom Events
- [ ] Create EventEmitter instances
- [ ] Emit events with data payloads
- [ ] Subscribe to events from children
- [ ] Handle multiple events
- [ ] Understand event propagation

### ✅ Dynamic Components
- [ ] Use ViewContainerRef to create components
- [ ] Use createComponent() method
- [ ] Pass input properties to dynamic components
- [ ] Destroy dynamic components
- [ ] Manage component lifecycle dynamically

---

## 📚 Component Syntax Reference

### Component Decorator
```typescript
@Component({
  selector: 'app-my-component',      // HTML selector name
  standalone: true,                  // Modern standalone component
  imports: [CommonModule],           // Required imports
  template: `<p>Hello</p>`,         // Inline template
  templateUrl: './file.html',       // External template
  styles: [`p { color: blue; }`],   // Inline styles
  styleUrl: './file.scss'           // External styles
})
export class MyComponent {
  // Component logic
}
```

### Data Binding
```html
<!-- Property Binding - One-way from component to template -->
<img [src]="imageUrl">
<p [class.active]="isActive">Text</p>
<button [disabled]="!isValid">Click</button>

<!-- Event Binding - Template to component -->
<button (click)="handleClick()">Click</button>
<input (keyup.enter)="onEnter()">
<input (blur)="onBlur()">

<!-- Two-Way Binding -->
<input [(ngModel)]="userName">

<!-- Interpolation - Display component property -->
<p>Hello {{ name }}</p>
<p>2 + 2 = {{ 2 + 2 }}</p>
```

### Structural Directives
```html
<!-- Conditional Rendering -->
<p *ngIf="isVisible">Visible when true</p>
<p *ngIf="age >= 18">Adult</p>
<p *ngIf="role === 'admin'">Admin</p>

<!-- List Rendering -->
<div *ngFor="let item of items">
  {{ item.name }}
</div>

<!-- Track changes -->
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>

<!-- ngSwitch -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'error'">Error occurred</p>
  <p *ngSwitchDefault>Default</p>
</div>
```

### Decorators
```typescript
// Inputs - Receive data from parent
@Input() name: string;
@Input() count: number = 0;

// Outputs - Send events to parent
@Output() submit = new EventEmitter<string>();

// ViewChild - Get single element reference
@ViewChild('myInput') inputRef: ElementRef;
@ViewChild('myComponent') component: MyComponent;

// ViewChildren - Get multiple element references
@ViewChildren('myElements') elements: QueryList<ElementRef>;

// ContentChild - Get content projection reference
@ContentChild('projectedContent') content: ElementRef;
```

### Lifecycle Hooks
```typescript
export class MyComponent implements
  OnInit,           // After initialization
  OnChanges,        // When inputs change
  OnDestroy,        // Before destruction
  AfterViewInit     // After view rendering
{
  ngOnInit() {
    // Called once after component initialization
  }

  ngOnChanges(changes: SimpleChanges) {
    // Called when @Input properties change
    // changes: { [propName: string]: SimpleChange }
  }

  ngAfterViewInit() {
    // Called after view is initialized
    // Safe to access @ViewChild here
  }

  ngOnDestroy() {
    // Called before component is destroyed
    // Clean up subscriptions, timers, etc.
  }
}
```

### Component Communication
```typescript
// Child emitting to parent
@Component({
  template: `<button (click)="onClick()">Click</button>`
})
export class ChildComponent {
  @Input() title: string;
  @Output() submit = new EventEmitter<string>();
  
  onClick() {
    this.submit.emit('data');
  }
}

// Parent receiving from child
@Component({
  template: `
    <app-child 
      [title]="'My Title'"
      (submit)="onSubmit($event)">
    </app-child>
  `
})
export class ParentComponent {
  onSubmit(data: string) {
    console.log(data);
  }
}
```

---

## 🔍 Common Patterns

### Pattern 1: Parent-Child Communication
```typescript
// Parent passes data, child emits events
<app-child [data]="parentData" (action)="parentAction($event)"></app-child>
```

### Pattern 2: Using Services for Communication
```typescript
// For sibling components or complex communication
@Injectable({ providedIn: 'root' })
export class SharedService {
  subject$ = new Subject<any>();
}
```

### Pattern 3: Safe Subscription
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.handle(data));
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Pattern 4: Async Pipe
```typescript
// Let Angular handle subscription/unsubscription
<div *ngIf="(data$ | async) as data">
  {{ data.name }}
</div>
```

---

## 🐛 Common Mistakes to Avoid

❌ **Don't** mutate input directly
```typescript
// ❌ Wrong
@Input() items: Item[];
addItem() { this.items.push(newItem); }

// ✅ Correct
@Input() items: Item[];
@Output() itemsChange = new EventEmitter<Item[]>();
addItem() { this.itemsChange.emit([...this.items, newItem]); }
```

❌ **Don't** forget to unsubscribe
```typescript
// ❌ Wrong
ngOnInit() {
  this.service.data$.subscribe(data => this.data = data);
}

// ✅ Correct
ngOnInit() {
  this.service.data$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
}
```

❌ **Don't** access ViewChild before AfterViewInit
```typescript
// ❌ Wrong
ngOnInit() {
  console.log(this.myRef.nativeElement); // undefined!
}

// ✅ Correct
ngAfterViewInit() {
  console.log(this.myRef.nativeElement); // now available
}
```

❌ **Don't** use complex logic in templates
```typescript
// ❌ Wrong
<p *ngIf="user && user.role && user.role.permissions && user.role.permissions[0]">
  Admin
</p>

// ✅ Correct (in component)
get isAdmin() { return this.user?.role?.permissions?.[0]; }

// In template
<p *ngIf="isAdmin">Admin</p>
```

---

## ⚡ Performance Tips

1. **Use OnPush Change Detection**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

2. **Use TrackBy in *ngFor**
```typescript
<div *ngFor="let item of items; trackBy: trackById">
```

3. **Unsubscribe from Observables**
```typescript
ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

4. **Use Async Pipe**
```html
<div *ngIf="(data$ | async) as data">
```

5. **Lazy Load Components**
```typescript
loadComponent: () => import('./my.component').then(m => m.MyComponent)
```

---

## 🧪 Testing Components

### Basic Test Structure
```typescript
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Test Input/Output
```typescript
// Test @Input
it('should set input property', () => {
  component.title = 'Test';
  expect(component.title).toBe('Test');
});

// Test @Output
it('should emit event', (done) => {
  component.submit.subscribe(value => {
    expect(value).toBe('data');
    done();
  });
  component.onSubmit();
});
```

---

## 📖 Learning Path

**Step 1:** Learn basic component structure
**Step 2:** Master property and event binding
**Step 3:** Understand parent-child communication
**Step 4:** Study lifecycle hooks
**Step 5:** Practice template references
**Step 6:** Create custom events
**Step 7:** Explore dynamic components
**Step 8:** Optimize and test

---

## 💡 Pro Tips

- Always use `trackBy` in `*ngFor` loops for performance
- Use the `async` pipe to automatically handle subscriptions
- Implement `OnDestroy` and unsubscribe in `ngOnDestroy`
- Use `ChangeDetectionStrategy.OnPush` for presentational components
- Test components with `TestBed` and `ComponentFixture`
- Use reactive programming with RxJS for complex state
- Document components with JSDoc comments
- Follow Angular style guide conventions

---

## 🎓 Next Steps

1. **Review the interactive examples** in the learning module
2. **Try modifying the code** and see what breaks
3. **Build your own components** using these patterns
4. **Read the Angular documentation** for deeper understanding
5. **Write unit tests** for your components
6. **Apply these patterns** in real projects

---

Good luck with your Angular learning journey! 🚀
