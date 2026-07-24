# Angular Routing - Interview Q&A

## Table of Contents
1. [Simple Questions](#simple-questions)
2. [Tricky Questions](#tricky-questions)
3. [Scenario-Based Questions](#scenario-based-questions)

---

## SIMPLE QUESTIONS

### Q1: What is Angular Routing and why do we need it?

**Answer:**
Angular Routing is a mechanism that allows navigation between different components in a Single Page Application (SPA) without full page reloads. It enables building applications with multiple views/pages that users can navigate between.

**Key Points:**
- Enables SPA navigation without server requests
- Maintains browser history (back/forward buttons work)
- Enables deep linking (direct URL access to any view)
- Improves user experience with seamless transitions
- Enables code splitting and lazy loading

**Example from the application:**
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },
  { path: 'courses/new', component: CourseDetailComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
```

---

### Q2: What is the difference between Routes, Router, and RouterOutlet?

**Answer:**

| Term | Purpose | Example |
|------|---------|---------|
| **Routes** | Array of route configuration objects | `const routes: Routes = [...]` |
| **Router** | Service for programmatic navigation | `router.navigate(['/courses'])` |
| **RouterOutlet** | Directive marking where components are rendered | `<router-outlet></router-outlet>` |

**Routes:**
```typescript
export const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailComponent }
];
```

**Router (Service):**
```typescript
export class LoginComponent {
  constructor(private router: Router) {}
  
  onSubmit() {
    this.router.navigate(['/courses']);  // Programmatic navigation
  }
}
```

**RouterOutlet (Template Directive):**
```html
<app-breadcrumbs></app-breadcrumbs>
<router-outlet></router-outlet>  <!-- Components are rendered here -->
```

---

### Q3: What are Route Parameters and how do you access them?

**Answer:**
Route parameters are dynamic parts of a URL that capture specific values. They're defined with a colon (`:paramName`) in the route path.

**Defining Route Parameters:**
```typescript
export const routes: Routes = [
  { path: 'courses/:id', component: CourseDetailComponent }
];
```

**Accessing Route Parameters:**
```typescript
export class CourseDetailComponent implements OnInit {
  courseId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Method 1: Using paramMap (Observable - recommended)
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id');
      this.loadCourse(this.courseId);
    });

    // Method 2: Using snapshot (synchronous)
    this.courseId = this.activatedRoute.snapshot.params['id'];
  }
}
```

**Example URL:** `/courses/123` → `id = "123"`

---

### Q4: What is ActivatedRoute and what does it provide?

**Answer:**
ActivatedRoute is a service that provides information about the currently activated route. It contains route parameters, query parameters, data, and more.

**Key Properties:**
```typescript
export class CourseDetailComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Route parameters: /courses/123 → params.id = "123"
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
    });

    // Query parameters: /courses?sort=asc&limit=10
    this.activatedRoute.queryParamMap.subscribe(params => {
      const sort = params.get('sort');
      const limit = params.get('limit');
    });

    // Route data: data defined in route config
    const breadcrumb = this.activatedRoute.snapshot.data['breadcrumb'];

    // Fragment: /courses#section1 → fragment = "section1"
    this.activatedRoute.fragment.subscribe(fragment => {
      console.log(fragment);
    });
  }
}
```

---

### Q5: What are Route Guards and why do we need them?

**Answer:**
Route Guards are functions or services that control whether a route can be activated or deactivated. They're used to protect routes from unauthorized access.

**Example from the application (authGuard):**
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;  // Allow navigation
  }

  router.navigate(['/login']);
  return false;  // Prevent navigation
};
```

**Applying Guard to Routes:**
```typescript
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authGuard]  // Protect this route
  }
];
```

---

### Q6: What is a Wildcard Route and when should it be placed?

**Answer:**
A wildcard route (`**`) matches any URL that doesn't match any other route. It should ALWAYS be the last route.

**Example from the application:**
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/new', component: CourseDetailComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }  // MUST be last!
];
```

**Important:** Routes are matched in order. If wildcard was placed earlier, it would match everything!

---

### Q7: What is pathMatch and why do we use it?

**Answer:**
`pathMatch` defines how the router matches a path against the URL. It has two values: `'full'` and `'prefix'` (default).

**pathMatch: 'full'**
```typescript
{ path: '', redirectTo: '/courses', pathMatch: 'full' }
```
- Matches the entire remaining URL
- Empty path only matches when URL is exactly empty

**pathMatch: 'prefix'** (default)
```typescript
{ path: 'courses', component: CoursesComponent }
```
- Matches if URL starts with the path

---

### Q8: What is the NotFoundComponent?

**Answer:**
The NotFoundComponent displays when users navigate to invalid URLs via the wildcard route.

**Component:**
```typescript
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {}
```

**Routing Configuration:**
```typescript
{ path: '404', component: NotFoundComponent },
{ path: '**', redirectTo: '/404' }  // All unmatched URLs → 404
```

---

### Q9: What is RouterLink and how is it different from programmatic navigation?

**Answer:**
RouterLink is a directive for template-based navigation, while programmatic navigation uses the Router service.

**RouterLink (Template-based):**
```html
<button routerLink="/courses">Go to Courses</button>
<button [routerLink]="['/courses', course.id]">Edit Course</button>
```

**Programmatic Navigation (Router Service):**
```typescript
export class LoginComponent {
  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/courses']);
  }
}
```

---

### Q10: What is RouterOutlet?

**Answer:**
RouterOutlet is a directive that marks the location where routed components should be rendered. It's the placeholder for dynamic component display.

**Example:**
```typescript
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs></app-breadcrumbs>
    <router-outlet></router-outlet>  <!-- Components render here -->
  `
})
export class AppComponent {}
```

---

## TRICKY QUESTIONS

### Q1: Why does the order of routes matter?

**Answer:**
Angular matches routes in the order they're defined. The first matching route wins. This is crucial because routes can overlap.

**Problem Scenario:**
```typescript
// ❌ WRONG ORDER
{ path: 'courses/:id', component: CourseDetailComponent },
{ path: 'courses/new', component: CourseDetailComponent }

// URL: /courses/new matches 'courses/:id' with id='new' ❌
```

**Correct Order:**
```typescript
// ✅ CORRECT ORDER
{ path: 'courses/new', component: CourseDetailComponent },  // More specific
{ path: 'courses/:id', component: CourseDetailComponent }   // Less specific
```

**Rule:** Always place more specific routes BEFORE less specific ones.

---

### Q2: How does CourseDetailComponent work for both creating and editing courses?

**Answer:**
The component detects its mode by checking if an `:id` route parameter exists.

**Implementation:**
```typescript
export class CourseDetailComponent implements OnInit {
  isNewCourse = true;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id) {
        // EDIT MODE
        this.isNewCourse = false;
        this.loadCourse(id);
      } else {
        // CREATE MODE
        this.isNewCourse = true;
      }
    });
  }

  onSubmit(): void {
    if (this.isNewCourse) {
      this.courseService.addCourse(formData);
    } else {
      this.courseService.updateCourse(this.courseId, formData);
    }
  }
}
```

**Routes:**
```typescript
{ path: 'courses/new', component: CourseDetailComponent },     // No :id
{ path: 'courses/:id', component: CourseDetailComponent }      // Has :id
```

---

### Q3: What is the difference between Router.navigate() and Router.navigateByUrl()?

**Answer:**

| Method | Takes | Use Case |
|--------|-------|----------|
| `navigate()` | Route segments array | Recommended - structured navigation |
| `navigateByUrl()` | Full URL string | When you have a complete URL |

**Router.navigate():**
```typescript
router.navigate(['/courses', courseId], {
  queryParams: { tab: 'overview' }
});
```

**Router.navigateByUrl():**
```typescript
router.navigateByUrl('/courses/123?tab=overview');
```

**Rule of Thumb:** Use `navigate()` 95% of the time - it's safer and more readable.

---

### Q4: What happens if the CourseDetailComponent doesn't subscribe to paramMap changes?

**Answer:**
The component will only load the course once (from the initial parameter), and won't update when navigating between different courses.

**Problem:**
```typescript
// ❌ WRONG - Uses snapshot, doesn't react to changes
ngOnInit(): void {
  const id = this.activatedRoute.snapshot.params['id'];
  this.loadCourse(id);  // Only loaded once
}
```

**When navigating from /courses/1 to /courses/2, the same component instance is reused, but ngOnInit() doesn't run again!**

**Solution:**
```typescript
// ✅ CORRECT - Subscribe to param changes
this.activatedRoute.paramMap.subscribe(params => {
  const id = params.get('id');
  this.loadCourse(id);  // Called every time params change
});
```

---

### Q5: Why is pathMatch: 'full' required for empty path?

**Answer:**
Without `pathMatch: 'full'`, the empty path would match EVERY URL (because every URL starts with empty string).

**Without pathMatch: 'full' (WRONG):**
```typescript
{ path: '', redirectTo: '/courses' }
// Problem: Matches '', '/courses', '/courses/123' → Infinite loop!
```

**With pathMatch: 'full' (CORRECT):**
```typescript
{ path: '', redirectTo: '/courses', pathMatch: 'full' }
// Correct: Matches ONLY when URL is exactly empty
```

---

### Q6: How do Route Guards prevent unauthorized access?

**Answer:**
Guards return `true` (allow) or `false` (deny). When `false`, navigation is prevented.

**The Flow:**
```
User tries to access /courses
↓
Router checks canActivate guards
↓
authGuard is called
↓
authService.isAuthenticated() → false
↓
router.navigate(['/login'])
↓
Return false (prevent navigation)
↓
User is redirected to login
```

---

### Q7: What would happen if both /courses/new and /courses/:id routes existed without proper ordering?

**Answer:**
The `/courses/new` route would never be reached. The parameter `:id` would match "new" as a parameter value, treating it as a course with id="new".

```typescript
// ❌ WRONG - /courses/new never reached
{ path: 'courses/:id', component: CourseDetailComponent },
{ path: 'courses/new', component: CourseDetailComponent }

// /courses/new matches :id with id="new"
// Creates a edit page for non-existent course
```

---

### Q8: Why does BreadcrumbsComponent only show on protected routes?

**Answer:**
Breadcrumbs only display on routes that have `data: { breadcrumb: 'Label' }` defined.

**Route Configuration:**
```typescript
{ path: 'login', component: LoginComponent },  // No breadcrumb data
{
  path: 'courses',
  component: CoursesComponent,
  data: { breadcrumb: 'Courses' }  // Has breadcrumb data
}
```

**Template:**
```html
<nav *ngIf="breadcrumbs.length > 0">
  <!-- Only renders when breadcrumbs exist -->
</nav>
```

---

### Q9: What's the issue with storing Observable in template without proper subscription management?

**Answer:**
Without async pipe or proper unsubscription, it leads to memory leaks and unhandled subscriptions.

**Better approach - use async pipe:**
```typescript
export class CoursesComponent {
  courses$ = this.courseService.getCourses();
}

<!-- Template -->
<div *ngIf="courses$ | async as courses">
  {{ courses.length }}
</div>
```

---

### Q10: Why might navigation fail silently if the Router is not injected?

**Answer:**
If Router is not injected, you can't call `router.navigate()`, and the navigation won't happen.

```typescript
// ❌ WRONG - Router not injected
export class LoginComponent {
  constructor(private authService: AuthService) {}
  
  onSubmit() {
    this.router.navigate(['/courses']);  // ❌ Router undefined!
  }
}

// ✅ CORRECT
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit() {
    this.router.navigate(['/courses']);  // ✓ Works
  }
}
```

---

## SCENARIO-BASED QUESTIONS

### Scenario 1: User logs in but isn't redirected to /courses

**Question:** What could be wrong?

**Answer:**
Several possibilities:

1. **Login component doesn't call router.navigate()**
```typescript
// ❌ WRONG
onSubmit(): void {
  this.authService.login(email, password).subscribe({
    next: (authState) => {
      // Missing navigation
    }
  });
}

// ✅ CORRECT
onSubmit(): void {
  this.authService.login(email, password).subscribe({
    next: (authState) => {
      this.router.navigate(['/courses']);  // Add this
    }
  });
}
```

2. **Router is not injected**
3. **AuthService state not updated before navigation**
4. **Auth guard is blocking the route**

---

### Scenario 2: Edit page shows wrong course data

**Question:** What's the issue?

**Answer:**
The component is likely using snapshot instead of subscribing to param changes.

**Solution:**
```typescript
// ✅ Subscribe to param changes
this.activatedRoute.paramMap
  .pipe(takeUntil(this.destroy$))
  .subscribe(params => {
    const id = params.get('id');
    this.loadCourse(id);  // Updates when ID changes
  });
```

---

### Scenario 3: Breadcrumbs showing on login page

**Question:** How to fix?

**Answer:**
Only define breadcrumb data on protected routes:

```typescript
{ path: 'login', component: LoginComponent },  // No data
{
  path: 'courses',
  component: CoursesComponent,
  canActivate: [authGuard],
  data: { breadcrumb: 'Courses' }  // Breadcrumb data only here
}
```

---

### Scenario 4: Query parameters lost after navigation

**Question:** How to preserve them?

**Answer:**
Use `queryParamsHandling: 'preserve'`:

```typescript
// ✅ Preserve existing query params
this.router.navigate(['/courses', courseId], {
  queryParamsHandling: 'preserve'
});

// Or merge new and existing
this.router.navigate(['/courses', courseId], {
  queryParams: { view: 'detailed' },
  queryParamsHandling: 'merge'
});
```

---

### Scenario 5: Prevent users from leaving edit page without saving

**Question:** How would you implement this?

**Answer:**
Use `canDeactivate` guard:

```typescript
export const canDeactivateGuard: CanDeactivateFn<any> = (component) => {
  if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};

// Apply to route
{
  path: 'courses/:id',
  component: CourseDetailComponent,
  canDeactivate: [canDeactivateGuard]
}

// In component
hasUnsavedChanges(): boolean {
  return this.courseForm.dirty;
}
```

---

## Key Concepts Summary

### Route Structure
```
/ (default) → /courses
/login → LoginComponent
/courses → CoursesComponent (protected)
/courses/new → CourseDetailComponent (protected)
/courses/:id → CourseDetailComponent (protected)
/404 → NotFoundComponent
/** → Catch-all → /404
```

### Navigation Methods
- **Template:** `routerLink="/courses"` or `[routerLink]="['/courses', id]"`
- **Programmatic:** `router.navigate(['/courses'])`
- **By URL:** `router.navigateByUrl('/courses')`

### Protecting Routes
```typescript
canActivate: [authGuard]  // Checks authentication before activation
canDeactivate: [guard]    // Warns before leaving
```

### Accessing Route Info
```typescript
paramMap        // Route parameters observable
queryParamMap   // Query parameters observable
snapshot.data   // Static route data
fragment        // URL fragment
```

---

**Document Version:** 1.0  
**Last Updated:** May 27, 2026  
**Application:** Angular Routing Course Management System
