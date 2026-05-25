# Best Practices Applied to Learning Platform

This guide shows how the best practices are implemented in the Angular Components Learning Platform and provides refactored examples.

## 📍 How Best Practices are Used in Our Learning Components

### 1. Counter Component - Single Responsibility ✅

**File:** `1-basic-components/counter.component.ts`

```typescript
// ✅ Single responsibility: Just handles counting logic
@Component({
  selector: 'app-counter'
  // Only displays counter and provides increment/decrement
})
export class CounterComponent {
  count: number = 0;
  
  // Simple, focused methods
  increment(): void { this.count++; }
  decrement(): void { if (this.count > 0) this.count--; }
  reset(): void { this.count = 0; }
}
```

**What's Good:**
- Component has only ONE job: manage a counter
- Easy to test
- Easy to reuse in other contexts
- Clear and simple

---

### 2. Product List/Card - @Input/@Output ✅

**Files:** `2-component-communication/product-card.component.ts` & `product-list.component.ts`

```typescript
// ✅ Child component: Uses @Input for data, @Output for events
@Component({
  selector: 'app-product-card',
  imports: [CommonModule]
})
export class ProductCardComponent {
  @Input() product!: Product;  // ✅ Data flows DOWN
  @Input() showDetails: boolean = false;

  @Output() addToCart = new EventEmitter<Product>();  // ✅ Events flow UP
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<number>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);  // ✅ Emit event, don't modify parent
  }
}

// ✅ Parent component: Handles all data changes
@Component({
  selector: 'app-product-list'
})
export class ProductListComponent {
  products: Product[] = [];
  cart: Product[] = [];

  onAddToCart(product: Product): void {
    this.cart.push(product);  // ✅ Parent manages its own state
  }

  onRemoveProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
  }
}
```

**What's Good:**
- Clear one-way data flow: Parent → Child via @Input
- Clear event flow: Child → Parent via @Output
- Child is "dumb" - doesn't know about parent
- Easy to test in isolation
- Highly reusable

---

### 3. Template Reference - Simple Templates ✅

**File:** `4-template-reference/template-reference-demo.component.ts`

```typescript
// ✅ Logic is in component class, not template
export class TemplateReferenceComponent {
  capturedUsername: string = '';

  // ✅ Template calls this method
  captureUsername(input: HTMLInputElement): void {
    this.capturedUsername = input.value;
  }
}

// ✅ Template is clean and simple
template: `
  <input #usernameInput placeholder="Enter username">
  <button (click)="captureUsername(usernameInput)">Capture</button>
  <p *ngIf="capturedUsername">You entered: {{ capturedUsername }}</p>
`
```

**What's Good:**
- Template is clean and readable
- Complex logic moved to component class
- Easy to understand what's happening
- Easier to test

---

### 4. Lifecycle Hooks - Used Correctly ✅

**File:** `3-lifecycle-hooks/lifecycle-demo.component.ts`

```typescript
export class LifecycleDemoComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() initialName: string = 'Angular';
  @ViewChild('myElement') myElement?: ElementRef;

  ngOnInit(): void {
    // ✅ Initialize component after properties are set
    this.isInitialized = true;
    this.loadInitialData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ React to @Input changes
    if (changes['initialName']) {
      this.handleNameChange();
    }
  }

  ngAfterViewInit(): void {
    // ✅ Safe to access ViewChild here
    if (this.myElement) {
      this.elementText = this.myElement.nativeElement.textContent;
    }
  }

  ngOnDestroy(): void {
    // ✅ Cleanup before destruction
    this.logEvent('Component destroyed');
  }
}
```

**What's Good:**
- Each hook is used for its intended purpose
- Proper timing for different tasks
- Good for teaching lifecycle concepts

---

### 5. Encapsulation - Component Styles ✅

**File:** `6-dynamic-components/dynamic-components-demo.component.ts`

```typescript
@Component({
  selector: 'app-widget',
  // ✅ Styles are scoped to this component
  styles: [`
    .widget {
      border: 1px solid #ddd;
      padding: 12px;
      // These styles ONLY apply to app-widget
    }
  `]
})
export class WidgetComponent {
  // Styles won't leak to other components
}
```

**What's Good:**
- Component styles don't affect other components
- Safe to use common class names
- Easy to refactor styles

---

### 6. Content Projection - Flexible Components ✅

**Example Pattern Used in Learning Components:**

```typescript
// Could be used for modal, card, panel components
@Component({
  selector: 'app-container',
  template: `
    <div class="container-header">
      <ng-content select=".header"></ng-content>
    </div>
    <div class="container-body">
      <ng-content></ng-content>
    </div>
    <div class="container-footer">
      <ng-content select=".footer"></ng-content>
    </div>
  `
})
export class ContainerComponent {}
```

---

## 📊 Refactored Examples

### Before & After: Todo List Component

#### ❌ BEFORE (Has Issues)

```typescript
@Component({
  selector: 'app-todo-list',
  template: `
    <div>
      <h2>Todos</h2>
      <input [(ngModel)]="newTodoText" type="text">
      <button (click)="addTodo()">Add</button>
      
      <!-- ❌ Complex template logic -->
      <ul *ngIf="todos.length > 0">
        <li *ngFor="let todo of todos">
          <input 
            type="checkbox" 
            [(ngModel)]="todo.completed"
            (change)="updateTodo(todo)">
          <span [style.textDecoration]="todo.completed ? 'line-through' : 'none'">
            {{ todo.text }}
          </span>
          <button (click)="removeTodo(todo.id)">X</button>
        </li>
      </ul>
      
      <!-- ❌ No error handling -->
      <p *ngIf="todos.length === 0">No todos</p>
    </div>
  `
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoText: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // ❌ No error handling
    this.todoService.getTodos().subscribe(
      todos => this.todos = todos
    );
  }

  // ❌ Logic in component
  addTodo() {
    if (!this.newTodoText.trim()) return;
    const todo: Todo = {
      id: Math.random(),
      text: this.newTodoText,
      completed: false
    };
    this.todos.push(todo);
    this.newTodoText = '';
    // ❌ Unsubscribed
    this.todoService.createTodo(todo).subscribe();
  }

  updateTodo(todo: Todo) {
    // ❌ Unsubscribed
    this.todoService.updateTodo(todo).subscribe();
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    // ❌ Unsubscribed
    this.todoService.deleteTodo(id).subscribe();
  }
}
```

#### ✅ AFTER (Best Practices Applied)

```typescript
// Service handles business logic
@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos$ = new BehaviorSubject<Todo[]>([]);
  todos = this.todos$.asObservable();

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.http.get<Todo[]>('/api/todos').pipe(
      tap(todos => this.todos$.next(todos))
    ).subscribe();
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/api/todos', todo).pipe(
      tap(newTodo => {
        const current = this.todos$.value;
        this.todos$.next([...current, newTodo]);
      })
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`/api/todos/${todo.id}`, todo).pipe(
      tap(updated => {
        const current = this.todos$.value;
        const index = current.findIndex(t => t.id === updated.id);
        current[index] = updated;
        this.todos$.next([...current]);
      })
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`/api/todos/${id}`).pipe(
      tap(() => {
        const current = this.todos$.value;
        this.todos$.next(current.filter(t => t.id !== id));
      })
    );
  }
}

// Presentational components with single responsibility
@Component({
  selector: 'app-todo-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="input-group">
      <input 
        [value]="text"
        (input)="onTextChange($event)"
        (keyup.enter)="onSubmit()"
        placeholder="Add a new todo...">
      <button (click)="onSubmit()" [disabled]="!text.trim()">
        Add
      </button>
    </div>
  `
})
export class TodoInputComponent {
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();

  onTextChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.textChange.emit(value);
  }

  onSubmit(): void {
    if (this.text.trim()) {
      this.submit.emit(this.text);
    }
  }
}

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="todo-item" [class.completed]="todo.completed">
      <input 
        type="checkbox"
        [checked]="todo.completed"
        (change)="onToggle()">
      <span>{{ todo.text }}</span>
      <button (click)="onDelete()" class="delete-btn">Delete</button>
    </li>
  `
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();

  onToggle(): void {
    this.toggle.emit({ ...this.todo, completed: !this.todo.completed });
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }
}

@Component({
  selector: 'app-todo-list',
  template: `
    <div class="todo-container">
      <h2>My Todos</h2>
      
      <app-todo-input 
        [text]="inputText"
        (textChange)="inputText = $event"
        (submit)="addTodo($event)">
      </app-todo-input>

      <ul class="todo-list" *ngIf="(todos$ | async) as todos; else emptyState">
        <app-todo-item
          *ngFor="let todo of todos; trackBy: trackById"
          [todo]="todo"
          (toggle)="updateTodo($event)"
          (delete)="deleteTodo($event)">
        </app-todo-item>
      </ul>

      <ng-template #emptyState>
        <p class="empty-message">No todos yet. Add one to get started!</p>
      </ng-template>
    </div>
  `
})
export class TodoListComponent {
  todos$ = this.todoService.todos;
  inputText: string = '';

  constructor(private todoService: TodoService) {}

  addTodo(text: string): void {
    const todo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    this.todoService.createTodo(todo).subscribe({
      next: () => {
        this.inputText = '';
      },
      error: (error) => {
        console.error('Failed to add todo:', error);
      }
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe({
      error: (error) => {
        console.error('Failed to update todo:', error);
      }
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      error: (error) => {
        console.error('Failed to delete todo:', error);
      }
    });
  }

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }
}
```

**Improvements:**
- ✅ Service handles all data
- ✅ Multiple focused components
- ✅ Async pipe for subscriptions
- ✅ Error handling
- ✅ TrackBy for performance
- ✅ OnPush strategy on presentational components
- ✅ Clear data flow

---

## 🧪 Testing Best Practices

### Before & After: Component Testing

#### ❌ BEFORE (Weak Tests)

```typescript
describe('ProductCardComponent', () => {
  it('should work', () => {
    const component = new ProductCardComponent();
    expect(component).toBeTruthy();
  });
});
```

#### ✅ AFTER (Proper Tests)

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

  describe('Input Properties', () => {
    it('should display product name from @Input', () => {
      const product: Product = {
        id: 1,
        name: 'Laptop',
        price: 999,
        description: 'High-performance laptop'
      };

      component.product = product;
      fixture.detectChanges();

      const nameElement = fixture.debugElement.query(By.css('h3'));
      expect(nameElement.nativeElement.textContent).toContain('Laptop');
    });

    it('should display product price', () => {
      component.product = { id: 1, name: 'Test', price: 99.99 };
      fixture.detectChanges();

      const priceElement = fixture.debugElement.query(By.css('.price'));
      expect(priceElement.nativeElement.textContent).toContain('99.99');
    });
  });

  describe('Output Events', () => {
    it('should emit addToCart event with product', (done) => {
      const product: Product = { id: 1, name: 'Test', price: 99.99 };
      component.product = product;

      component.addToCart.subscribe((emitted) => {
        expect(emitted).toEqual(product);
        done();
      });

      component.onAddToCart();
    });

    it('should emit removeProduct event with product id', (done) => {
      component.product = { id: 42, name: 'Test', price: 99.99 };

      component.removeProduct.subscribe((id) => {
        expect(id).toBe(42);
        done();
      });

      component.onRemoveProduct();
    });
  });

  describe('Visual States', () => {
    it('should hide details when showDetails is false', () => {
      component.product = { id: 1, name: 'Test', price: 99.99 };
      component.showDetails = false;
      fixture.detectChanges();

      const infoDiv = fixture.debugElement.query(By.css('.info'));
      expect(infoDiv).toBeNull();
    });

    it('should show details when showDetails is true', () => {
      component.product = { id: 1, name: 'Test', price: 99.99 };
      component.showDetails = true;
      fixture.detectChanges();

      const infoDiv = fixture.debugElement.query(By.css('.info'));
      expect(infoDiv).toBeTruthy();
    });
  });
});
```

---

## 📋 Implementation Checklist

When building a new component, follow this checklist:

- [ ] **Component has single responsibility** - Does one thing well
- [ ] **Uses @Input for data** - Data flows down from parent
- [ ] **Uses @Output for events** - Events flow up to parent
- [ ] **Template is simple** - Logic moved to component class
- [ ] **Appropriate lifecycle hooks** - Using right hooks for tasks
- [ ] **Styles are encapsulated** - No style leaks
- [ ] **No business logic** - Logic in services
- [ ] **Uses OnPush where possible** - Performance optimized
- [ ] **Has unit tests** - Core functionality tested
- [ ] **Documented** - Comments explaining complex parts

---

## 🎓 Learning Progression

### Week 1: Fundamentals
- Master basic component structure
- Understand @Input and @Output
- Learn simple data binding

### Week 2: Best Practices
- Apply single responsibility
- Write clean templates
- Use lifecycle hooks properly

### Week 3: Architecture
- Implement service layer
- Use dependency injection
- Separate concerns

### Week 4: Performance & Testing
- Apply OnPush strategy
- Write comprehensive tests
- Optimize change detection

---

**Apply these practices to write production-ready Angular components!** 🚀
