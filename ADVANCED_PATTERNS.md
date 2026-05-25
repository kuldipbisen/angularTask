# Advanced Angular Component Patterns

This guide demonstrates advanced patterns and techniques for building professional Angular applications.

## 📋 Table of Contents

1. [Smart vs. Presentational Components](#smart-vs-presentational-components)
2. [Component Communication Patterns](#component-communication-patterns)
3. [Error Handling](#error-handling)
4. [Performance Optimization](#performance-optimization)
5. [Real-World Examples](#real-world-examples)

---

## Smart vs. Presentational Components

### Presentational Components (Dumb)
- Focus on UI rendering
- Accept data via @Input()
- Emit events via @Output()
- No business logic
- Highly reusable

```typescript
// Example: ProductCardComponent
@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
      <button (click)="onBuy()">Buy Now</button>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product: Product;
  @Output() buy = new EventEmitter<Product>();
  
  onBuy() {
    this.buy.emit(this.product);
  }
}
```

### Smart Components (Container)
- Handle business logic
- Manage state
- Fetch data
- Contain presentational components
- Less reusable

```typescript
// Example: ProductListComponent
@Component({
  selector: 'app-product-list',
  template: `
    <app-product-card 
      *ngFor="let product of products"
      [product]="product"
      (buy)="handleBuy($event)">
    </app-product-card>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit() {
    // Fetch data from service
    this.productService.getProducts().subscribe(
      (data) => this.products = data
    );
  }
  
  handleBuy(product: Product) {
    this.productService.addToCart(product).subscribe();
  }
}
```

### Benefits
- **Separation of Concerns**: UI logic separate from business logic
- **Reusability**: Presentational components can be used anywhere
- **Testability**: Easier to test with mocked data
- **Maintainability**: Easier to understand and modify

---

## Component Communication Patterns

### 1. Parent to Child Communication

#### Using @Input()
```typescript
// Child Component
@Component({
  template: `<p>{{ message }}</p>`
})
export class ChildComponent {
  @Input() message: string;
}

// Parent Component
@Component({
  template: `<app-child [message]="'Hello from parent'"></app-child>`
})
export class ParentComponent {}
```

#### Using Services
```typescript
// Shared Service
@Injectable({ providedIn: 'root' })
export class DataService {
  data$ = new BehaviorSubject<string>('');
  
  setData(value: string) {
    this.data$.next(value);
  }
}

// Child Component
export class ChildComponent {
  data$ = this.dataService.data$;
  constructor(private dataService: DataService) {}
}

// Parent Component
export class ParentComponent {
  constructor(private dataService: DataService) {
    this.dataService.setData('Hello from parent');
  }
}
```

### 2. Child to Parent Communication

#### Using @Output() and EventEmitter
```typescript
// Child Component
@Component({
  template: `<button (click)="sendData()">Send Data</button>`
})
export class ChildComponent {
  @Output() dataEvent = new EventEmitter<string>();
  
  sendData() {
    this.dataEvent.emit('Data from child');
  }
}

// Parent Component
@Component({
  template: `
    <app-child (dataEvent)="onDataReceived($event)"></app-child>
    <p>{{ receivedData }}</p>
  `
})
export class ParentComponent {
  receivedData: string;
  
  onDataReceived(data: string) {
    this.receivedData = data;
  }
}
```

### 3. Sibling Communication

#### Using Shared Service
```typescript
// Shared Service
@Injectable({ providedIn: 'root' })
export class SharedService {
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();
  
  sendMessage(message: string) {
    this.messageSubject.next(message);
  }
}

// Sibling 1 (Sender)
export class Sibling1Component {
  constructor(private sharedService: SharedService) {}
  
  send() {
    this.sharedService.sendMessage('Hello sibling 2');
  }
}

// Sibling 2 (Receiver)
export class Sibling2Component {
  constructor(private sharedService: SharedService) {}
  
  ngOnInit() {
    this.sharedService.message$.subscribe(
      (message) => console.log(message)
    );
  }
}
```

---

## Error Handling

### Component Error Handling
```typescript
export class DataComponent implements OnInit {
  data: any;
  error: string | null = null;
  isLoading = false;

  constructor(private service: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.error = null;

    this.service.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load data';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  retry() {
    this.loadData();
  }
}
```

### Template Error Display
```html
<div *ngIf="isLoading">Loading...</div>
<div *ngIf="error" class="error-message">
  <p>{{ error }}</p>
  <button (click)="retry()">Retry</button>
</div>
<div *ngIf="data && !isLoading">
  <!-- Display data -->
</div>
```

---

## Performance Optimization

### 1. OnPush Change Detection Strategy
```typescript
@Component({
  selector: 'app-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ product.name }}</p>`
})
export class ProductComponent {
  @Input() product: Product;
}
```

### 2. TrackBy Function in *ngFor
```typescript
@Component({
  template: `
    <div *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </div>
  `
})
export class ListComponent {
  items: Item[] = [];
  
  trackById(index: number, item: Item) {
    return item.id;
  }
}
```

### 3. Lazy Loading Modules
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./products/product-list.component')
      .then(m => m.ProductListComponent)
  }
];
```

### 4. Unsubscribe from Observables
```typescript
export class DataComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## Real-World Examples

### Example 1: Form Component with Validation
```typescript
@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email">
      <span *ngIf="email?.hasError('required')">Email is required</span>
      
      <input formControlName="password" type="password">
      <span *ngIf="password?.hasError('minlength')">
        Password must be at least 8 characters
      </span>
      
      <button [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

### Example 2: Async Pipe Usage
```typescript
@Component({
  template: `
    <div *ngIf="(data$ | async) as data">
      <p>{{ data.name }}</p>
    </div>
  `
})
export class AsyncComponent {
  data$ = this.service.getData();
  
  constructor(private service: DataService) {}
}
```

### Example 3: Two-Way Binding
```typescript
@Component({
  template: `
    <input [(ngModel)]="name" placeholder="Enter name">
    <p>Hello {{ name }}</p>
  `
})
export class TwoWayBindingComponent {
  name: string = '';
}
```

---

## Key Takeaways

✅ **Use Smart and Presentational components** for better organization
✅ **Choose the right communication pattern** for your use case
✅ **Handle errors gracefully** in components
✅ **Optimize performance** with OnPush and trackBy
✅ **Unsubscribe from observables** to prevent memory leaks
✅ **Keep components focused** on single responsibility
✅ **Test components thoroughly** with proper setup
✅ **Use TypeScript** for better type safety

---

## Resources

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Component API Documentation](https://angular.io/api/core/Component)
- [Best Practices](https://angular.io/guide/styleguide#application-structure-and-ngmodules)
