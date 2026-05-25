# Angular Components - Best Practices & Design Principles

A comprehensive guide to building professional, maintainable, and performant Angular components.

## 📋 Table of Contents

1. [Single Responsibility Principle](#single-responsibility-principle)
2. [Data Flow with @Input/@Output](#data-flow-with-inputoutput)
3. [Simple Templates](#simple-templates)
4. [Lifecycle Hooks](#lifecycle-hooks)
5. [Encapsulation](#encapsulation)
6. [Content Projection](#content-projection)
7. [Avoid Business Logic](#avoid-business-logic)
8. [Change Detection Strategy](#change-detection-strategy)
9. [Component Testing](#component-testing)
10. [Real-World Examples](#real-world-examples)

---

## 1. Single Responsibility Principle

**What it means:** Each component should have only one reason to change. It should handle a single concern.

### ❌ Bad Example (Multiple Responsibilities)
```typescript
@Component({
  selector: 'app-user-management',
  template: `
    <!-- Handling user list, form, validation, and API calls -->
    <div>
      <h2>Users</h2>
      <!-- User list rendering -->
      <ul>
        <li *ngFor="let user of users">{{ user.name }}</li>
      </ul>
      <!-- User form -->
      <form>
        <input [(ngModel)]="newUser.name">
        <input [(ngModel)]="newUser.email">
        <button (click)="saveUser()">Save</button>
      </form>
      <!-- Validation messages -->
      <div *ngIf="errors">
        <p *ngFor="let error of errors">{{ error }}</p>
      </div>
    </div>
  `
})
export class UserManagementComponent {
  users: User[] = [];
  newUser: User = {};
  errors: string[] = [];

  ngOnInit() {
    this.fetchUsers(); // API call
  }

  fetchUsers() {
    // Complex API logic
  }

  saveUser() {
    // Validation logic
    // API call logic
    // Error handling
  }
}
```

### ✅ Good Example (Single Responsibilities)
```typescript
// 1. Service handles data and API calls
@Injectable({ providedIn: 'root' })
export class UserService {
  users$ = this.http.get<User[]>('/api/users');
  
  saveUser(user: User) {
    return this.http.post('/api/users', user);
  }
}

// 2. Validation service handles validation
@Injectable({ providedIn: 'root' })
export class UserValidationService {
  validateUser(user: User): string[] {
    const errors: string[] = [];
    if (!user.name) errors.push('Name is required');
    if (!user.email) errors.push('Email is required');
    return errors;
  }
}

// 3. List component handles displaying users
@Component({
  selector: 'app-user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `
})
export class UserListComponent {
  @Input() users: User[] = [];
}

// 4. Form component handles user input
@Component({
  selector: 'app-user-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="user.name" name="name">
      <input [(ngModel)]="user.email" name="email">
      <button type="submit">Save</button>
    </form>
  `
})
export class UserFormComponent {
  @Input() user: User = {};
  @Output() submit = new EventEmitter<User>();

  onSubmit() {
    this.submit.emit(this.user);
  }
}

// 5. Container component orchestrates everything
@Component({
  selector: 'app-user-management',
  template: `
    <div>
      <app-user-form [user]="newUser" (submit)="saveUser($event)"></app-user-form>
      <div *ngIf="errors$ | async as errors">
        <p *ngFor="let error of errors">{{ error }}</p>
      </div>
      <app-user-list [users]="users$ | async"></app-user-list>
    </div>
  `
})
export class UserManagementComponent {
  users$ = this.userService.users$;
  errors$ = new Subject<string[]>();
  newUser: User = {};

  constructor(
    private userService: UserService,
    private validationService: UserValidationService
  ) {}

  saveUser(user: User) {
    const errors = this.validationService.validateUser(user);
    if (errors.length > 0) {
      this.errors$.next(errors);
      return;
    }
    this.userService.saveUser(user).subscribe();
  }
}
```

**Benefits:**
- Each component has one reason to change
- Easier to test in isolation
- More reusable
- Better code organization

---

## 2. Data Flow with @Input/@Output

**What it means:** Use decorators for parent-child communication. Never manipulate parent data directly.

### ❌ Bad Example (Direct Data Manipulation)
```typescript
// Child component accessing parent data directly
@Component({
  selector: 'app-child',
  template: `<button (click)="addItem()">Add</button>`
})
export class ChildComponent {
  constructor(private parent: ParentComponent) {} // Direct parent access!

  addItem() {
    this.parent.items.push(new Item()); // Directly modifying parent
  }
}

@Component({
  selector: 'app-parent',
  template: `<app-child></app-child>`
})
export class ParentComponent {
  items: Item[] = [];
}
```

### ✅ Good Example (@Input/@Output)
```typescript
// Child component uses decorators
@Component({
  selector: 'app-child',
  template: `<button (click)="onAddItem()">Add</button>`
})
export class ChildComponent {
  @Input() items: Item[] = [];
  @Output() itemAdded = new EventEmitter<Item>();

  onAddItem() {
    this.itemAdded.emit(new Item());
  }
}

// Parent component handles data changes
@Component({
  selector: 'app-parent',
  template: `
    <app-child 
      [items]="items" 
      (itemAdded)="onItemAdded($event)">
    </app-child>
  `
})
export class ParentComponent {
  items: Item[] = [];

  onItemAdded(item: Item) {
    this.items.push(item); // Parent handles its own data
  }
}
```

**Key Points:**
- ✅ Use `@Input()` for downward data flow
- ✅ Use `@Output()` with EventEmitter for upward events
- ✅ Parent handles its own state changes
- ✅ Child is unaware of parent implementation

---

## 3. Simple Templates

**What it means:** Keep templates clean, readable, and focused on presentation.

### ❌ Bad Example (Complex Template)
```typescript
@Component({
  template: `
    <div *ngIf="user && user.role && user.role.permissions && 
         user.role.permissions.length > 0 && 
         user.role.permissions[0] === 'admin'">
      <div *ngFor="let item of items | filter:searchTerm | sort:sortBy">
        <p>{{ item.name | uppercase | slice:0:20 }}...</p>
        <span *ngIf="item.price > 100">Premium</span>
        {{ calculateDiscount(item) }}
      </div>
    </div>
  `
})
export class ProductListComponent {
  calculateDiscount(item: Item) {
    // Complex logic in template
    return item.price * (1 - item.discount / 100);
  }
}
```

### ✅ Good Example (Simple Template)
```typescript
@Component({
  template: `
    <div *ngIf="canViewProducts">
      <div *ngFor="let item of filteredAndSortedItems">
        <p>{{ itemDisplayName(item) }}</p>
        <span *ngIf="isPremium(item)">Premium</span>
        <span>{{ item.discountedPrice | currency }}</span>
      </div>
    </div>
  `
})
export class ProductListComponent {
  @Input() items: Item[] = [];
  @Input() user: User;
  @Input() searchTerm: string = '';
  @Input() sortBy: string = 'name';

  // Move logic to component class
  get canViewProducts(): boolean {
    return this.user?.role?.permissions?.includes('admin') ?? false;
  }

  get filteredAndSortedItems(): Item[] {
    return this.items
      .filter(item => this.matchesSearch(item))
      .sort((a, b) => this.compare(a, b));
  }

  itemDisplayName(item: Item): string {
    return item.name.toUpperCase().slice(0, 20) + '...';
  }

  isPremium(item: Item): boolean {
    return item.price > 100;
  }

  private matchesSearch(item: Item): boolean {
    return item.name.includes(this.searchTerm);
  }

  private compare(a: Item, b: Item): number {
    return a[this.sortBy] > b[this.sortBy] ? 1 : -1;
  }
}
```

**Benefits:**
- Templates are easier to read
- Logic is testable
- Performance is better
- Accessibility improves

---

## 4. Lifecycle Hooks

**What it means:** Use lifecycle hooks appropriately for different stages of component life.

### ✅ Correct Lifecycle Hook Usage

```typescript
export class DataComponent implements
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit
{
  @Input() dataId: number;
  @ViewChild('container') container: ElementRef;
  
  private destroy$ = new Subject<void>();

  // ✅ ngOnInit: Initialize component after properties are set
  ngOnInit(): void {
    this.loadData();
    // Subscribe to observables
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.processData(data));
  }

  // ✅ ngOnChanges: React to @Input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataId']) {
      this.loadData();
    }
  }

  // ✅ ngAfterViewInit: Access template elements
  ngAfterViewInit(): void {
    // Safe to access ViewChild references
    this.container.nativeElement.focus();
  }

  // ✅ ngOnDestroy: Cleanup resources
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    // Load data implementation
  }

  private processData(data: any): void {
    // Process data implementation
  }
}
```

### Lifecycle Hook Guide

| Hook | When Called | Use For |
|------|-------------|---------|
| `ngOnInit` | Once after first change detection | Initialize data, fetch from service |
| `ngOnChanges` | When @Input properties change | React to input changes |
| `ngAfterViewInit` | After view is rendered | Access DOM elements, @ViewChild |
| `ngOnDestroy` | Before component destroyed | Cleanup, unsubscribe, timers |
| `ngAfterContentInit` | After content projection | Work with projected content |

---

## 5. Encapsulation

**What it means:** Use view encapsulation to isolate component styles and prevent style leaks.

### ✅ Good Example (View Encapsulation)

```typescript
@Component({
  selector: 'app-card',
  encapsulation: ViewEncapsulation.Emulated, // Default, safe
  template: `
    <div class="card">
      <h3>{{ title }}</h3>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
    }
    h3 {
      color: #333;
      margin: 0 0 10px 0;
    }
  `]
})
export class CardComponent {
  @Input() title: string;
}
```

### Encapsulation Modes

```typescript
// 1. Emulated (Default) - Simulates Shadow DOM
@Component({
  encapsulation: ViewEncapsulation.Emulated
})

// 2. Shadow DOM - True encapsulation (not all browsers)
@Component({
  encapsulation: ViewEncapsulation.ShadowDom
})

// 3. None - No encapsulation (styles leak out)
@Component({
  encapsulation: ViewEncapsulation.None
})
```

---

## 6. Content Projection

**What it means:** Use `<ng-content>` to create flexible, reusable components.

### ✅ Good Example (Content Projection)

```typescript
// Reusable card component
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content select=".card-header"></ng-content>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <ng-content select=".card-footer"></ng-content>
    </div>
  `,
  styles: [`
    .card { /* styles */ }
    .card-body { padding: 20px; }
  `]
})
export class CardComponent {}

// Usage - Flexible content
@Component({
  template: `
    <app-card>
      <h3 class="card-header">{{ title }}</h3>
      <p>Card content</p>
      <button class="card-footer">Action</button>
    </app-card>
  `
})
export class ParentComponent {
  title = 'My Card';
}
```

**Benefits:**
- Component is more flexible
- Can accommodate various content layouts
- Reduces need for multiple component variants

---

## 7. Avoid Business Logic in Components

**What it means:** Keep components focused on presentation. Move business logic to services.

### ❌ Bad Example (Business Logic in Component)

```typescript
@Component({
  selector: 'app-cart',
  template: `
    <div *ngFor="let item of cartItems">
      {{ item.name }} - ${{ calculateItemTotal(item) }}
    </div>
    <p>Total: ${{ calculateTotal() }}</p>
  `
})
export class CartComponent {
  cartItems: CartItem[] = [];

  calculateItemTotal(item: CartItem): number {
    return item.price * item.quantity * (1 - item.discount / 100);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity * (1 - item.discount / 100));
    }, 0);
  }
}
```

### ✅ Good Example (Business Logic in Service)

```typescript
// Service handles business logic
@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems$ = this.store.select(selectCartItems);

  calculateItemTotal(item: CartItem): number {
    return item.price * item.quantity * (1 - item.discount / 100);
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      return total + this.calculateItemTotal(item);
    }, 0);
  }

  addItem(item: CartItem): void {
    this.store.dispatch(addToCart({ item }));
  }

  removeItem(itemId: string): void {
    this.store.dispatch(removeFromCart({ itemId }));
  }
}

// Component only handles presentation
@Component({
  selector: 'app-cart',
  template: `
    <div *ngFor="let item of cartItems">
      {{ item.name }} - ${{ cartService.calculateItemTotal(item) }}
    </div>
    <p>Total: ${{ cartService.calculateTotal(cartItems) }}</p>
  `
})
export class CartComponent {
  cartItems: CartItem[] = [];

  constructor(public cartService: CartService) {}
}
```

---

## 8. Change Detection Strategy

**What it means:** Use OnPush for presentational components to improve performance.

### ✅ Good Example (OnPush Strategy)

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ Optimize!
  template: `
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
      <button (click)="onAddToCart()">Add</button>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
```

### When to Use OnPush

✅ **Use OnPush when:**
- Component only uses @Input properties
- No asynchronous operations
- No direct DOM manipulation
- No service subscriptions

❌ **Don't use OnPush when:**
- Component subscribes to services
- Component uses timers or animations
- Component needs frequent updates

---

## 9. Component Testing

**What it means:** Write unit tests to verify component behavior.

### ✅ Good Example (Component Testing)

```typescript
describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  // Test @Input
  it('should display product name from input', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 99.99 };
    component.product = product;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent)
      .toContain('Test Product');
  });

  // Test @Output
  it('should emit addToCart event when button clicked', (done) => {
    const product: Product = { id: 1, name: 'Test', price: 99.99 };
    component.product = product;
    
    component.addToCart.subscribe((emittedProduct) => {
      expect(emittedProduct).toEqual(product);
      done();
    });

    fixture.debugElement.query(By.css('button')).nativeElement.click();
  });

  // Test component logic
  it('should calculate discount correctly', () => {
    component.product = { id: 1, name: 'Test', price: 100, discount: 10 };
    expect(component.calculateDiscountedPrice()).toBe(90);
  });
});
```

### Testing Checklist

- [ ] Test component initialization
- [ ] Test @Input properties
- [ ] Test @Output events
- [ ] Test user interactions
- [ ] Test conditional rendering
- [ ] Test computed properties
- [ ] Test error scenarios

---

## 10. Real-World Examples

### Example 1: Search Component

```typescript
// Presentational component
@Component({
  selector: 'app-search-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input 
      [value]="searchTerm"
      (input)="onSearch($event)"
      placeholder="Search...">
  `
})
export class SearchBoxComponent {
  @Input() searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.search.emit(term);
  }
}

// Container component
@Component({
  selector: 'app-search-container',
  template: `
    <app-search-box 
      [searchTerm]="searchTerm$ | async"
      (search)="onSearch($event)">
    </app-search-box>
    <app-result-list [results]="results$ | async"></app-result-list>
  `
})
export class SearchContainerComponent {
  private searchTerm$ = new BehaviorSubject<string>('');
  results$ = this.searchTerm$.pipe(
    debounceTime(300),
    switchMap(term => this.searchService.search(term))
  );

  onSearch(term: string) {
    this.searchTerm$.next(term);
  }

  constructor(private searchService: SearchService) {}
}
```

### Example 2: Form Component

```typescript
@Component({
  selector: 'app-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <input formControlName="email" type="email">
        <span *ngIf="emailErrors">{{ emailErrors }}</span>
      </div>
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  @Output() submit = new EventEmitter<FormValue>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get emailErrors(): string {
    const control = this.form.get('email');
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Invalid email format';
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }

  constructor(private fb: FormBuilder) {}
}
```

---

## Summary Checklist

- [ ] **SRP**: Each component has single responsibility
- [ ] **@Input/@Output**: Using decorators for data flow
- [ ] **Simple Templates**: Logic moved to component class
- [ ] **Lifecycle Hooks**: Using appropriate hooks for tasks
- [ ] **Encapsulation**: Styles properly isolated
- [ ] **Content Projection**: Using ng-content for flexibility
- [ ] **No Business Logic**: Logic in services, not components
- [ ] **OnPush**: Applied to presentational components
- [ ] **Tests**: Unit tests written and passing
- [ ] **Documentation**: Components documented with comments

---

## Quick Reference

### Data Flow
```
Parent Component
    ↓ @Input() [property]="value"
Child Component
    ↓ @Output() (event)="handler($event)"
Parent Component
```

### Best Practice Template
```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>{{ data }}</div>
    <button (click)="onAction()">Action</button>
  `,
  styles: [`
    div { /* styles */ }
  `]
})
export class ExampleComponent {
  @Input() data: any;
  @Output() action = new EventEmitter();

  onAction() {
    this.action.emit('action-data');
  }
}
```

---

## Resources

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Component Best Practices](https://angular.io/guide/component-overview)
- [Change Detection](https://angular.io/guide/change-detection)
- [View Encapsulation](https://angular.io/guide/view-encapsulation)
- [Content Projection](https://angular.io/guide/content-projection)

---

**Master these principles to write clean, maintainable, and professional Angular components!** 🎯
