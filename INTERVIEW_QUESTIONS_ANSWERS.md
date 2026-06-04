# Angular Components Application - Interview Questions & Answers

## Application Overview

**Project**: Course Management Platform  
**Type**: Angular Standalone Components Application  
**Architecture**: Modular component-based with parent-child communication  
**Version**: Angular 19+

---

## 📌 SIMPLE QUESTIONS & ANSWERS

### 1. **What is the main purpose of this application?**

**Answer:**  
This is an Angular-based **Course Management Platform** designed to:
- Display a list of available courses with details (title, instructor, description, level, rating, price)
- Allow users to search and filter courses
- Provide course management functionality (view, edit, delete)
- Demonstrate best practices in Angular component architecture

**Key Features:**
- Course listing with pagination
- Search/filter functionality
- Course cards with detailed information
- Header, footer, and navigation elements
- Responsive layout
- Console logging for debugging

---

### 2. **How many components does this application have, and what are their purposes?**

**Answer:**

| Component | Purpose |
|-----------|---------|
| **AppComponent** | Root component that bootstraps the application |
| **CourseManagementComponent** | Main container managing courses, search, and pagination |
| **CourseItemComponent** | Individual course card with actions (view, edit, delete) |
| **HeaderComponent** | Navigation header with branding and title |
| **FooterComponent** | Footer with company info and links |
| **BreadcrumbsComponent** | Navigation breadcrumbs for user orientation |
| **SearchControlComponent** | Search input for filtering courses |

**Component Hierarchy:**
```
AppComponent
└── CourseManagementComponent
    ├── HeaderComponent
    ├── BreadcrumbsComponent
    ├── SearchControlComponent
    ├── CourseItemComponent (multiple instances)
    └── FooterComponent
```

---

### 3. **What design patterns are used in this application?**

**Answer:**

1. **Component-Based Architecture**
   - Modular, reusable, standalone components
   - Single Responsibility Principle

2. **Parent-Child Communication**
   - Using `@Input()` for passing data down
   - Using `@Output()` for emitting events up
   - Example: `CourseManagementComponent` (parent) manages `CourseItemComponent` (children)

3. **Standalone Components**
   - Each component is self-contained
   - No NgModule required
   - Direct imports in component metadata

4. **Event Emitter Pattern**
   - Components emit custom events to communicate with parents
   - Example: `@Output() deleteCourse = new EventEmitter<number>()`

5. **Lifecycle Hook Pattern**
   - Using `ngOnInit` for initialization logic
   - Using `ngOnDestroy` for cleanup
   - Console logging for debugging lifecycle

---

### 4. **Which lifecycle hooks are implemented, and why?**

**Answer:**

| Hook | Implementation | Purpose |
|------|----------------|---------|
| **ngOnInit** | ✅ Implemented in all components | Initialize data, fetch courses, setup component |
| **ngOnDestroy** | ✅ Implemented in all components | Cleanup, unsubscribe, log component destruction |
| **ngOnChanges** | ❌ Not needed | No complex input tracking required |
| **ngDoCheck** | ❌ Not needed | Default change detection sufficient |
| **ngAfterViewInit** | ❌ Not needed | No template reference variables used |

**Example from FooterComponent:**
```typescript
ngOnInit(): void {
  console.log('[Footer] ngOnInit called - Component initialized');
  this.footerLinks = [
    { label: 'About Us', url: '/about' },
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Contact', url: '/contact' }
  ];
}

ngOnDestroy(): void {
  console.log('[Footer] ngOnDestroy called - Component destroyed');
}
```

---

### 5. **What is @Input() and @Output() and how are they used?**

**Answer:**

**@Input() Decorator:**
- Allows parent components to pass data to child components
- Used in `CourseItemComponent` to receive course data

**Example:**
```typescript
export class CourseItemComponent {
  @Input() course!: Course;  // Parent passes course data
}
```

**@Output() Decorator:**
- Allows child components to emit events to parent components
- Uses `EventEmitter` to communicate user actions

**Example:**
```typescript
export class CourseItemComponent {
  @Output() deleteCourse = new EventEmitter<number>();
  @Output() viewCourse = new EventEmitter<number>();
  @Output() editCourse = new EventEmitter<number>();
  
  onDelete(): void {
    this.deleteCourse.emit(this.course.id);
  }
}
```

**Parent Usage (CourseManagementComponent):**
```typescript
// Template
<app-course-item 
  [course]="course" 
  (deleteCourse)="handleDeleteCourse($event)">
</app-course-item>

// Component
handleDeleteCourse(courseId: number): void {
  this.courses = this.courses.filter(c => c.id !== courseId);
}
```

**Benefits:**
- Unidirectional data flow
- Clear separation of concerns
- Reusable components
- Easier testing

---

### 6. **What is a Standalone Component?**

**Answer:**

A **Standalone Component** is an Angular component that doesn't require an NgModule. It can declare its own dependencies directly.

**Standalone Component Syntax:**
```typescript
@Component({
  selector: 'app-header',
  standalone: true,           // ✅ Standalone flag
  imports: [CommonModule],    // ✅ Direct imports
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
```

**Traditional Component (with NgModule):**
```typescript
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
```

**Benefits of Standalone:**
- ✅ Simpler, less boilerplate
- ✅ No NgModule needed
- ✅ Easier to understand component dependencies
- ✅ Better tree-shaking for unused components
- ✅ Modern Angular best practice (Angular 14+)

---

### 7. **What is two-way binding and where is it used?**

**Answer:**

**Two-Way Binding** allows automatic synchronization of data between component and template using `[(ngModel)]`.

**Where used in this app:**
```typescript
// SearchControlComponent
export class SearchControlComponent {
  searchText: string = '';
}

// Template
<input [(ngModel)]="searchText" (change)="onSearchChange(searchText)">
```

**What it does:**
- Combines property binding `[property]` and event binding `(event)`
- Equivalent to: `[ngModel]="searchText" (ngModelChange)="searchText=$event"`

**Example breakdown:**
```html
<!-- Two-way binding -->
<input [(ngModel)]="searchText">

<!-- Equivalent to -->
<input [ngModel]="searchText" (ngModelChange)="searchText = $event">
```

**Benefits:**
- ✅ Automatic data synchronization
- ✅ Reduces boilerplate code
- ✅ Improves readability
- ✅ Less prone to synchronization errors

---

### 8. **What is the Course interface and why is it used?**

**Answer:**

**Course Interface Definition:**
```typescript
export interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  level: string;           // 'Beginner', 'Intermediate', 'Advanced'
  students: number;
  rating: number;
  price: number;
}
```

**Why it's used:**

1. **Type Safety**
   - Provides strong typing for course objects
   - Catches errors at compile time
   - Better IDE autocompletion

2. **Consistency**
   - Ensures all courses have same structure
   - Prevents typos and missing properties

3. **Documentation**
   - Self-documents the course structure
   - Clear contracts between components

4. **Example Usage:**
```typescript
courses: Course[] = [];  // Array of strongly typed courses

private allCourses: Course[] = [
  {
    id: 1,
    title: 'Angular Fundamentals',
    instructor: 'John Doe',
    description: 'Learn Angular basics...',
    level: 'Beginner',
    students: 1250,
    rating: 4.8,
    price: 49.99
  }
  // ... more courses
];
```

---

### 9. **How is pagination implemented?**

**Answer:**

**Pagination Logic in CourseManagementComponent:**

```typescript
courses: Course[] = [];              // All courses
filteredCourses: Course[] = [];      // After filtering
displayedCourses: Course[] = [];     // Current page

itemsPerPage: number = 6;            // Courses per page
currentPage: number = 1;             // Current page number

// Update displayed courses based on pagination
updateDisplayedCourses(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.displayedCourses = this.filteredCourses.slice(startIndex, endIndex);
}
```

**Steps:**

1. **Calculate range**: `(currentPage - 1) × itemsPerPage` to `currentPage × itemsPerPage`
2. **Slice array**: Use `slice()` to get subset of courses
3. **Display**: Show only items in range
4. **Update**: Call when page changes or filters applied

**Example:**
- Page 1: Items 0-5 (6 items)
- Page 2: Items 6-11 (6 items)
- Page 3: Items 12-17 (6 items)

---

### 10. **What is the purpose of console.log in components?**

**Answer:**

**Purpose:**
Console logs are used for **debugging and tracking component lifecycle**.

**Examples in application:**
```typescript
constructor() {
  console.log('[Header] Constructor called');
}

ngOnInit(): void {
  console.log('[Header] ngOnInit called - Component initialized');
}

ngOnDestroy(): void {
  console.log('[Header] ngOnDestroy called - Component destroyed');
}

onDelete(): void {
  console.log('[CourseItem] Delete event - Course ID:', this.course.id);
  this.deleteCourse.emit(this.course.id);
}
```

**Benefits:**
- ✅ Understand component lifecycle flow
- ✅ Debug user interactions
- ✅ Monitor when components initialize/destroy
- ✅ Track data changes
- ✅ Helpful during development

**Best Practice Note:**
Production code should remove or conditionally log (using environment flags)

---

## 🔥 TRICKY QUESTIONS & ANSWERS

### 1. **Explain the data flow between CourseManagementComponent and CourseItemComponent**

**Answer:**

**Unidirectional Data Flow (Parent → Child → Parent):**

```typescript
// STEP 1: Parent passes data DOWN via @Input
// CourseManagementComponent (Parent)
displayedCourses: Course[] = [/*...*/];

// Template
<app-course-item 
  *ngFor="let course of displayedCourses"
  [course]="course"
  (deleteCourse)="onDeleteCourse($event)"
  (viewCourse)="onViewCourse($event)"
  (editCourse)="onEditCourse($event)">
</app-course-item>
```

```typescript
// STEP 2: Child receives data via @Input
// CourseItemComponent (Child)
@Input() course!: Course;  // ✅ Receives course from parent

ngOnInit(): void {
  console.log('[CourseItem] Course initialized:', this.course.title);
}
```

```typescript
// STEP 3: Child emits events UP via @Output
@Output() deleteCourse = new EventEmitter<number>();

onDelete(): void {
  console.log('[CourseItem] Delete course:', this.course.id);
  this.deleteCourse.emit(this.course.id);  // ✅ Emit to parent
}
```

```typescript
// STEP 4: Parent handles event
// CourseManagementComponent (Parent)
onDeleteCourse(courseId: number): void {
  console.log('[CourseManagement] Deleting course:', courseId);
  this.courses = this.courses.filter(c => c.id !== courseId);
  this.updateDisplayedCourses();
}
```

**Data Flow Diagram:**
```
┌─────────────────────────────────────────────────────────┐
│      CourseManagementComponent (Parent)                 │
│  courses: Course[] = [{id:1, title:'Angular'...}]     │
└─────────────────────────────────────────────────────────┘
         ↓ [course]="course" (Property Binding)
┌─────────────────────────────────────────────────────────┐
│        CourseItemComponent (Child)                      │
│  @Input() course!: Course                              │
│  @Output() deleteCourse = new EventEmitter<number>()   │
└─────────────────────────────────────────────────────────┘
         ↑ (deleteCourse)="handler($event)" (Event Binding)
┌─────────────────────────────────────────────────────────┐
│      CourseManagementComponent (Parent)                 │
│  onDeleteCourse(courseId: number) { ... }              │
└─────────────────────────────────────────────────────────┘
```

**Key Points:**
- ✅ Unidirectional: Parent → Child (data) → Parent (events)
- ✅ No two-way binding between components
- ✅ Clear data flow (easier to debug)
- ✅ Each component owns its state

---

### 2. **Why is Angular moving away from NgModules to Standalone Components?**

**Answer:**

**Problems with NgModules:**

1. **Boilerplate Code**
   ```typescript
   // Old way - lots of setup
   @NgModule({
     declarations: [HeaderComponent, FooterComponent],
     imports: [CommonModule],
     exports: [HeaderComponent, FooterComponent]
   })
   export class SharedModule {}
   ```

2. **Complex Dependency Management**
   - Hard to track which module provides what
   - Circular dependencies possible
   - Lazy loading complexity

3. **Tree-shaking Issues**
   - Modules bundle unused components
   - Larger bundle sizes
   - Bad for performance

4. **Learning Curve**
   - Confusing for beginners
   - Multiple ways to organize code
   - Hard to know best practices

**Benefits of Standalone:**

```typescript
// New way - simple and clean
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {}
```

**Advantages:**
- ✅ Less boilerplate
- ✅ Clear dependencies (see imports directly in component)
- ✅ Better tree-shaking (only imported components included)
- ✅ Easier to learn and understand
- ✅ Smaller bundle sizes
- ✅ Modern Angular approach (14+)
- ✅ This application uses standalone (standalone: true)

---

### 3. **What are potential memory leaks in this application and how to prevent them?**

**Answer:**

**Potential Memory Leaks:**

1. **Event Listeners Not Cleaned Up**

**Problem:**
```typescript
ngOnInit(): void {
  // ❌ Event listener added but never removed
  document.addEventListener('click', this.handleClick);
}

ngOnDestroy(): void {
  // ❌ Missing cleanup - MEMORY LEAK!
}
```

**Solution:**
```typescript
constructor() {
  this.handleClick = this.handleClick.bind(this);
}

ngOnInit(): void {
  // ✅ Save reference for removal
  document.addEventListener('click', this.handleClick);
}

ngOnDestroy(): void {
  // ✅ Remove event listener
  document.removeEventListener('click', this.handleClick);
}

private handleClick = () => { /* ... */ };
```

2. **Unsubscribed Observables**

**Problem:**
```typescript
ngOnInit(): void {
  // ❌ Subscription not unsubscribed
  this.service.getData().subscribe(data => {
    this.data = data;
  });
}

ngOnDestroy(): void {
  // ❌ Missing unsubscribe - MEMORY LEAK!
}
```

**Solution:**
```typescript
private subscriptions = new Subscription();

ngOnInit(): void {
  // ✅ Track subscription
  this.subscriptions.add(
    this.service.getData().subscribe(data => {
      this.data = data;
    })
  );
}

ngOnDestroy(): void {
  // ✅ Unsubscribe from all
  this.subscriptions.unsubscribe();
}
```

3. **Circular References**

**Problem:**
```typescript
// ❌ Parent and child reference each other
@Component({
  selector: 'app-parent'
})
export class ParentComponent {
  @ViewChild(ChildComponent) child!: ChildComponent;
  
  ngOnDestroy(): void {
    // ✅ Clear reference to prevent circular refs
    this.child = null!;
  }
}
```

**Best Practices for This Application:**

```typescript
// ✅ Implement OnDestroy
export class FooterComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // Initialize
  }

  ngOnDestroy(): void {
    // Cleanup
    console.log('[Footer] ngOnDestroy - Cleanup resources');
  }
}
```

---

### 4. **How would you implement a TrackBy function for the ngFor loop?**

**Answer:**

**What is TrackBy?**
- Performance optimization for `*ngFor`
- Helps Angular identify which items have changed
- Prevents unnecessary DOM re-creation

**Problem without TrackBy:**

```typescript
// ❌ Without trackBy - slow with large lists
<div *ngFor="let course of displayedCourses">
  <app-course-item [course]="course"></app-course-item>
</div>

// Angular re-renders all items when list changes
// If list goes from [1,2,3] to [1,2,3,4], items 1,2,3 are re-created!
```

**Solution with TrackBy:**

```typescript
// ✅ With trackBy - optimized
<div *ngFor="let course of displayedCourses; trackBy: trackByCourse">
  <app-course-item [course]="course"></app-course-item>
</div>

// Component
trackByCourse(index: number, course: Course): number {
  return course.id;  // Return unique identifier
}
```

**How it works:**

```typescript
// When list changes from [1,2,3] to [1,2,3,4]
// Angular only creates item 4 (identified by unique id)
// Items 1,2,3 are reused (not re-created)

// Memory/Performance Improvement:
// Without trackBy: Recreate all 4 items
// With trackBy:   Recreate only 1 item
// = 75% performance improvement
```

**Best Implementation:**

```typescript
trackByFn = (index: number, item: any) => item.id;

// Or method reference
trackByCourseId(index: number, course: Course): number {
  return course.id;
}

// Usage in template
<div *ngFor="let course of courses; trackBy: trackByCourseId">
```

**When to use:**
- ✅ Lists with 10+ items
- ✅ Items have unique ID
- ✅ Performance critical lists
- ✅ Frequently updating lists

---

### 5. **Explain change detection in Angular and how it works in this application**

**Answer:**

**What is Change Detection?**
- Process where Angular checks if component data changed
- Updates DOM if changes detected
- Runs after events, timers, HTTP calls

**Change Detection Strategies:**

1. **Default Strategy (OnPush not used)**
```typescript
// This application uses DEFAULT strategy
@Component({
  selector: 'app-course-item',
  // ❌ No changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course!: Course;
}
```

**How it works:**
- Checks entire component tree on every event
- Safe but slower with large applications
- Uses zone.js to track async operations

2. **OnPush Strategy (More efficient)**
```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush  // ✅ Optimized
})
export class CourseItemComponent {
  @Input() course!: Course;
}
```

**When it checks:**
- When @Input changes
- When @Output event fires
- When component event fires (click, etc.)
- ❌ NOT on unrelated events (faster!)

**Change Detection Flow in This App:**

```
1. User clicks delete button
   ↓
2. Browser fires 'click' event
   ↓
3. Zone.js detects async operation
   ↓
4. Angular triggers change detection
   ↓
5. Checks CourseItemComponent
   - Is @Input course different? → No change needed
   - Did @Output emit? → Yes, deleteCourse emitted
   ↓
6. Checks CourseManagementComponent
   - Handler runs: onDeleteCourse(courseId)
   - courses array modified
   ↓
7. Angular detects change
   ↓
8. Re-renders template
   - Course removed from list
   - DisplayedCourses updated
   ↓
9. DOM updated
```

**Performance Optimization Opportunities:**

```typescript
// Current: DEFAULT change detection
// Every event triggers full check

// Better: OnPush strategy
@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course!: Course;  // Only check when this changes
}

// Even better: Use immutable data
handleDeleteCourse(courseId: number): void {
  // ✅ Create new array (immutable)
  this.courses = this.courses.filter(c => c.id !== courseId);
  
  // ❌ Don't mutate existing array
  // this.courses.splice(index, 1);
}
```

---

### 6. **How would you handle errors in HTTP requests if this was connected to a backend API?**

**Answer:**

**Current State:**
- Mock data in component
- No HTTP service calls
- No error handling needed

**How to Add Error Handling:**

**Step 1: Create a Service**
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://api.example.com/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Error:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Error Code: ${error.status}\n`,
        `Message: ${error.message}`
      );
    }
    
    return throwError(() => new Error('Failed to load courses'));
  }
}
```

**Step 2: Use Service in Component**
```typescript
export class CourseManagementComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  loading: boolean = false;
  error: string | null = null;
  private subscriptions = new Subscription();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.error = null;
    
    this.subscriptions.add(
      this.courseService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
          this.loading = false;
          console.log('Courses loaded successfully');
        },
        error: (error) => {
          this.error = 'Failed to load courses. Please try again.';
          this.loading = false;
          console.error('Failed to load courses:', error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
```

**Step 3: Update Template**
```html
<!-- Show loading state -->
<div *ngIf="loading" class="spinner">Loading courses...</div>

<!-- Show error -->
<div *ngIf="error" class="error-message">
  {{ error }}
  <button (click)="loadCourses()">Retry</button>
</div>

<!-- Show courses -->
<div *ngIf="!loading && !error" class="courses">
  <app-course-item 
    *ngFor="let course of courses"
    [course]="course">
  </app-course-item>
</div>
```

**Error Handling Best Practices:**
- ✅ Distinguish between client and server errors
- ✅ Show user-friendly error messages
- ✅ Provide retry functionality
- ✅ Unsubscribe to prevent memory leaks
- ✅ Use error boundaries
- ✅ Log errors for debugging

---

### 7. **What is the difference between @Input() and regular component properties?**

**Answer:**

**@Input() Decorator:**

```typescript
export class CourseItemComponent {
  @Input() course!: Course;  // ✅ Comes from parent
  
  ngOnInit() {
    // course is provided by parent via property binding
    console.log(this.course.title);
  }
}

// Parent usage
<app-course-item [course]="myCourse"></app-course-item>
```

**Regular Property:**

```typescript
export class HeaderComponent {
  title: string = 'Course Management Platform';  // ✅ Local to component
  
  ngOnInit() {
    // title is internal, not from parent
    console.log(this.title);
  }
}
```

**Key Differences:**

| Aspect | @Input | Regular Property |
|--------|--------|------------------|
| **Source** | Parent component | Component itself |
| **Binding** | One-way from parent | Local only |
| **Change Detection** | Monitored by Angular | Not monitored |
| **Usage** | Public input interface | Internal state |
| **Template access** | From parent | Internal |
| **Type Safety** | Enforced | Enforced locally |

**Real Example:**

```typescript
// Parent - CourseManagementComponent
courses: Course[] = [{id: 1, title: 'Angular', ...}];

<app-course-item [course]="courses[0]"></app-course-item>

// Child - CourseItemComponent
@Input() course!: Course;  // ✅ Receives {id:1, title:'Angular',...}

// This property is NOT @Input
title: string = 'Course Card';  // ✅ Always 'Course Card' for all instances

// Difference:
// course → Different for each instance (from parent)
// title → Same for all instances (local)
```

**When to Use:**

- **@Input**: Data that varies per instance from parent
- **Regular Property**: Default values or internal state

---

### 8. **How would you implement routing in this application?**

**Answer:**

**Current State:**
- No routing
- Single page component
- No navigation between views

**How to Add Routing:**

**Step 1: Setup Routes**
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { CourseManagementComponent } from './components/course-management.component';
import { CourseDetailComponent } from './components/course-detail.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CourseManagementComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: '**', redirectTo: '/courses' }  // Catch-all
];
```

**Step 2: Setup Router in App**
```typescript
// app.config.ts
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes)
  ]
};

// main.ts
bootstrapApplication(AppComponent, appConfig);
```

**Step 3: Add Router Outlet**
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {}
```

**Step 4: Add Navigation**
```typescript
// course-management.component.ts
import { Router } from '@angular/router';

export class CourseManagementComponent {
  constructor(private router: Router) {}
  
  onViewCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}

// Template
<app-course-item 
  (viewCourse)="onViewCourse($event)">
</app-course-item>
```

**Step 5: Handle Route Parameters**
```typescript
// course-detail.component.ts
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {
  courseId: number | null = null;
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // ✅ Get ID from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseId = parseInt(id);
        this.loadCourse();
      }
    });
  }

  loadCourse(): void {
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe(
        course => this.course = course
      );
    }
  }
}
```

**Routing Benefits:**
- ✅ Navigate between views without page reload
- ✅ Back/forward browser buttons work
- ✅ Bookmarkable URLs
- ✅ Better user experience
- ✅ Lazy loading support

---

### 9. **What is the difference between ngOnInit and the constructor?**

**Answer:**

**Constructor:**
```typescript
export class FooterComponent {
  footerLinks: any[] = [];
  
  constructor() {
    // ❌ Don't initialize data here
    // ❌ @Input not available yet
    // ❌ No async operations
    
    // ✅ Initialize simple properties
    console.log('[Footer] Constructor called');
  }
}
```

**ngOnInit:**
```typescript
export class FooterComponent implements OnInit {
  footerLinks: any[] = [];
  
  ngOnInit(): void {
    // ✅ Initialize component data
    // ✅ @Input properties available
    // ✅ Can perform async operations
    // ✅ Queries can run
    
    console.log('[Footer] ngOnInit called');
    this.footerLinks = [
      { label: 'About Us', url: '/about' },
      { label: 'Privacy Policy', url: '/privacy' }
    ];
  }
}
```

**Key Differences:**

| Aspect | Constructor | ngOnInit |
|--------|-------------|----------|
| **Called** | When class instantiated | After component initialized |
| **@Input available** | ❌ No | ✅ Yes |
| **Can initialize data** | Simple props only | ✅ Full initialization |
| **Async operations** | ❌ Not recommended | ✅ Yes (subscribe, etc.) |
| **View queries** | ❌ Not available | ✅ Available after ViewInit |
| **Use case** | Dependency injection | Initialize logic |

**Real Example from App:**

```typescript
// ❌ Wrong approach
constructor(private service: CourseService) {
  // @Input course not available!
  // this.course might be undefined
  console.log(this.course);  // ❌ UNDEFINED
}

// ✅ Correct approach
ngOnInit(): void {
  // @Input course now available!
  console.log(this.course);  // ✅ DEFINED
  
  if (this.course) {
    console.log('Course:', this.course.title);
  }
}
```

---

### 10. **How would you test the CourseItemComponent?**

**Answer:**

**Unit Test for CourseItemComponent:**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent, Course } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    // Setup testing module
    await TestBed.configureTestingModule({
      imports: [CourseItemComponent]
    }).compileComponents();

    // Create component
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
  });

  // Test 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: @Input receives data
  it('should receive course via @Input', () => {
    const mockCourse: Course = {
      id: 1,
      title: 'Angular Fundamentals',
      instructor: 'John Doe',
      description: 'Learn Angular',
      level: 'Beginner',
      students: 1250,
      rating: 4.8,
      price: 49.99
    };

    component.course = mockCourse;
    fixture.detectChanges();

    expect(component.course).toBe(mockCourse);
    expect(component.course.title).toBe('Angular Fundamentals');
  });

  // Test 3: Delete event emitted
  it('should emit deleteCourse event when onDelete is called', (done) => {
    const mockCourse: Course = {
      id: 1,
      title: 'Angular',
      instructor: 'John',
      description: 'Learn',
      level: 'Beginner',
      students: 100,
      rating: 4.8,
      price: 49.99
    };

    component.course = mockCourse;

    // Listen for output event
    component.deleteCourse.subscribe((courseId: number) => {
      expect(courseId).toBe(1);
      done();
    });

    // Trigger delete
    component.onDelete();
  });

  // Test 4: View event emitted
  it('should emit viewCourse event when onView is called', (done) => {
    const mockCourse: Course = {
      id: 2,
      title: 'TypeScript',
      instructor: 'Jane',
      description: 'Learn TS',
      level: 'Intermediate',
      students: 200,
      rating: 4.9,
      price: 59.99
    };

    component.course = mockCourse;

    component.viewCourse.subscribe((courseId: number) => {
      expect(courseId).toBe(2);
      done();
    });

    component.onView();
  });

  // Test 5: ngOnInit called
  it('should log when ngOnInit is called', () => {
    spyOn(console, 'log');

    const mockCourse: Course = {
      id: 3,
      title: 'React',
      instructor: 'Mike',
      description: 'Learn React',
      level: 'Beginner',
      students: 300,
      rating: 4.7,
      price: 49.99
    };

    component.course = mockCourse;
    component.ngOnInit();

    expect(console.log).toHaveBeenCalledWith(
      '[CourseItem] ngOnInit called - Course item initialized:',
      'React'
    );
  });

  // Test 6: Template rendering
  it('should render course title in template', () => {
    const mockCourse: Course = {
      id: 4,
      title: 'Vue.js',
      instructor: 'Sarah',
      description: 'Learn Vue',
      level: 'Beginner',
      students: 400,
      rating: 4.6,
      price: 44.99
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    // Check if course title is rendered
    // (depends on template structure)
    const titleElement = compiled.querySelector('.course-title');
    expect(titleElement?.textContent).toContain('Vue.js');
  });
});
```

**Testing Best Practices:**

1. **Setup Component Correctly**
   ```typescript
   await TestBed.configureTestingModule({
     imports: [CourseItemComponent]  // Standalone component
   }).compileComponents();
   ```

2. **Test @Input/@Output**
   ```typescript
   component.course = mockData;  // Set @Input
   component.deleteCourse.subscribe(...);  // Listen for @Output
   ```

3. **Mock Data**
   ```typescript
   const mockCourse: Course = { /* full object */ };
   ```

4. **Detect Changes**
   ```typescript
   fixture.detectChanges();  // Trigger change detection
   ```

5. **Spy on Methods**
   ```typescript
   spyOn(console, 'log');
   expect(console.log).toHaveBeenCalled();
   ```

---

## 📊 Summary Table

| Concept | Simple Explanation | Tricky Part |
|---------|-------------------|------------|
| **Components** | Reusable UI building blocks | Lifecycle management |
| **@Input/@Output** | Parent-child communication | Unidirectional data flow |
| **Lifecycle Hooks** | When component initializes/destroys | Timing and async ops |
| **Standalone** | No NgModule needed | Dependency resolution |
| **Change Detection** | How Angular updates UI | Performance optimization |
| **TrackBy** | Optimize *ngFor loops | When and why to use |
| **Error Handling** | Catch API failures | Retry logic & UX |
| **Routing** | Navigate between pages | ActivatedRoute params |
| **Testing** | Unit test components | Mock @Input/@Output |
| **Memory Leaks** | Resource cleanup | Event listener cleanup |

---

## 🎯 Interview Tips

**Do's:**
- ✅ Explain concepts with examples
- ✅ Show understanding of architecture
- ✅ Mention performance considerations
- ✅ Discuss best practices
- ✅ Ask clarifying questions

**Don'ts:**
- ❌ Don't just memorize answers
- ❌ Don't avoid tricky questions
- ❌ Don't neglect error handling
- ❌ Don't forget about memory leaks
- ❌ Don't ignore performance

---

## 📚 Related Concepts Not Covered Here

- Services and Dependency Injection
- RxJS Observables & Operators
- HTTP Client
- Reactive Forms
- Template-driven Forms
- Guards and Interceptors
- State Management (NgRx)
- Performance Optimization (OnPush, lazy loading)
- SSR and PWA
- Testing with Jasmine/Karma

---

**Last Updated**: May 26, 2026  
**Framework**: Angular 19+  
**Project**: Course Management Platform
