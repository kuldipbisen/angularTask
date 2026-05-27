# Angular Course Management Application - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Architecture](#architecture)
4. [Core Modules & Components](#core-modules--components)
5. [Data Models](#data-models)
6. [Routing System](#routing-system)
7. [Code Explanation](#code-explanation)
8. [Build & Run Commands](#build--run-commands)

---

## Overview

**Application Name**: AGMP Tests (Angular Course Management Platform)

**Purpose**: A web-based learning platform that allows users to authenticate and browse a catalog of training courses.

**Key Features**:
- User authentication (login page)
- Course catalog display
- Breadcrumb navigation
- Responsive layout with header and footer
- Standalone Angular components (Angular 19+)

**Technology Stack**:
- **Framework**: Angular 19.1.0
- **Language**: TypeScript 5.7.2
- **Styling**: SCSS
- **Testing**: Jest (unit tests), Cypress (end-to-end tests)
- **Build Tool**: Angular CLI 19.1.6
- **Package Manager**: npm
- **Runtime**: Zone.js, RxJS 7.8.0

---

## Project Structure

```
src/
├── app/
│   ├── app.component.ts          # Root component
│   ├── app.component.html        # Root template
│   ├── app.component.scss        # Root styles
│   ├── app.routes.ts             # Route configuration
│   ├── app.config.ts             # Application configuration
│   │
│   ├── models/
│   │   ├── course.ts             # Course interface
│   │   └── user.ts               # User interface
│   │
│   ├── components/
│   │   ├── logo/                 # Logo component
│   │   ├── header/               # Header navigation component
│   │   ├── footer/               # Footer component
│   │   ├── breadcrumbs/          # Breadcrumb navigation component
│   │   └── course-list/          # Course list display component
│   │
│   └── pages/
│       ├── login/                # Login page component
│       └── courses/              # Courses page component
│
├── index.html                    # Main HTML entry point
├── main.ts                       # Application bootstrap
└── styles.scss                   # Global styles

cypress/                          # E2E tests
jest.config.js                    # Jest configuration
tsconfig.json                     # TypeScript configuration
package.json                      # Dependencies
```

---

## Architecture

### Component Hierarchy

```
AppComponent (Root)
├── AppHeader (shown on all pages except login)
│   └── LogoComponent
├── Router Outlet (dynamic content)
│   ├── LoginComponent
│   └── CoursesComponent
│       ├── AppBreadcrumbsComponent
│       └── AppCourseListComponent
└── AppFooter (shown on all pages except login)
```

### Architectural Pattern

The application follows:
- **Standalone Components Architecture**: No NgModules used
- **Smart/Dumb Component Pattern**: 
  - Smart: `CoursesComponent`, `LoginComponent` (manage state and logic)
  - Dumb: `BreadcrumbsComponent`, `CourseListComponent` (receive data via @Input)
- **Reactive Programming**: Uses RxJS for async operations

---

## Core Modules & Components

### 1. **Root Component - AppComponent**

**File**: `src/app/app.component.ts`

```typescript
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'agmp-tests';

  constructor(public router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
```

**Purpose**: 
- Entry point for the entire application
- Manages the overall layout (header, main content, footer)
- Conditionally hides header and footer on login page

**Key Methods**:
- `isLoginPage()`: Checks if current route is login page to conditionally render header/footer

**Template** (`app.component.html`):
```html
<div class="app-wrapper">
  <app-header *ngIf="!isLoginPage()"></app-header>
  
  <main class="app-content">
    <router-outlet></router-outlet>  <!-- Dynamic page content -->
  </main>
  
  <app-footer *ngIf="!isLoginPage()"></app-footer>
</div>
```

---

### 2. **Routing Configuration - app.routes.ts**

**File**: `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent }
];
```

**Route Structure**:
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Redirects to `/login` | Default entry point |
| `/login` | LoginComponent | User authentication |
| `/courses` | CoursesComponent | Course catalog display |

---

### 3. **Application Configuration - app.config.ts**

**File**: `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimize change detection
    provideRouter(routes)  // Enable routing
  ]
};
```

**Configuration Details**:
- **provideZoneChangeDetection**: Optimizes Angular's change detection with event coalescing
- **provideRouter**: Registers route configuration

---

### 4. **Login Component**

**File**: `src/app/pages/login/login.component.ts`

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
}
```

**Purpose**: 
- Provides user authentication interface
- Collects email and password credentials

**Properties**:
- `email`: Store user's email input
- `password`: Store user's password input

**Template** (`login.component.html`):
```html
<div class="login-container">
  <div class="login-card">
    <h2>Login</h2>
    <form (ngSubmit)="onLogin()">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          [(ngModel)]="email" 
          name="email" 
          placeholder="Enter your email" 
          required
        >
      </div>
      <!-- Password field similar -->
    </form>
  </div>
</div>
```

**Key Features**:
- Two-way data binding with `[(ngModel)]` for reactive form inputs
- Form submission with `(ngSubmit)="onLogin()"`

---

### 5. **Courses Page Component**

**File**: `src/app/pages/courses/courses.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BreadcrumbsComponent, Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.component';
import { CourseListComponent, Course } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BreadcrumbsComponent, CourseListComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  courses: Course[] = [];

  ngOnInit() {
    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Courses' }
    ];

    this.courses = [
      {
        id: 1,
        title: 'Angular Basics',
        description: 'Learn the fundamentals of Angular framework',
        instructor: 'John Doe',
        duration: '8 hours'
      },
      // More courses...
    ];
  }
}
```

**Purpose**:
- Display available courses
- Show breadcrumb navigation
- Manage course data

**Lifecycle Hook**:
- `ngOnInit()`: Initializes breadcrumbs and course list when component loads

**Data Structure**:
- `breadcrumbs`: Navigation path for user orientation
- `courses`: Array of course objects to display

**Template** (`courses.component.html`):
```html
<app-header></app-header>

<main class="courses-page">
  <div class="container">
    <app-breadcrumbs [breadcrumbs]="breadcrumbs"></app-breadcrumbs>
    
    <h1>Available Courses</h1>
    <p class="page-description">Explore our selection of high-quality courses</p>
    
    <app-course-list [courses]="courses"></app-course-list>
  </div>
</main>

<app-footer></app-footer>
```

---

### 6. **Header Component**

**File**: `src/app/components/header/header.component.ts`

```typescript
import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
```

**Purpose**:
- Displays navigation header
- Includes logo component
- Provides consistent header across pages

---

### 7. **Logo Component**

**File**: `src/app/components/logo/logo.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

}
```

**Purpose**:
- Display application branding/logo
- Reusable branding element

---

### 8. **Breadcrumbs Component**

**File**: `src/app/components/breadcrumbs/breadcrumbs.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Breadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
}
```

**Purpose**:
- Show navigation breadcrumb trail
- Help users understand page hierarchy

**Properties**:
- `@Input() breadcrumbs`: Array of breadcrumb objects received from parent

**Breadcrumb Interface**:
```typescript
export interface Breadcrumb {
  label: string;     // Display text
  url?: string;      // Optional navigation link
}
```

---

### 9. **Course List Component**

**File**: `src/app/components/course-list/course-list.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
}
```

**Purpose**:
- Display list of courses
- Present course information in organized format

**Properties**:
- `@Input() courses`: Array of course objects from parent component

**Course Interface**:
```typescript
export interface Course {
  id: number;              // Unique identifier
  title: string;           // Course name
  description: string;     // Course description
  instructor: string;      // Instructor name
  duration: string;        // Course duration
}
```

---

### 10. **Footer Component**

**File**: `src/app/components/footer/footer.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
```

**Purpose**:
- Display application footer
- Provide footer information (copyright, links, etc.)

---

## Data Models

### 1. **Course Interface**

**File**: `src/app/models/course.ts`

```typescript
export interface Course {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;  // in minutes
  description: string;
}
```

**Purpose**: Type definition for course data

**Properties**:
| Property | Type | Description |
|----------|------|-------------|
| `id` | number | Unique course identifier |
| `title` | string | Course name/title |
| `creationDate` | Date | Course creation date |
| `duration` | number | Course length in minutes |
| `description` | string | Course description |

---

### 2. **User Interface**

**File**: `src/app/models/user.ts`

```typescript
export interface User {
  id: number;
  firstName: string;
  lastName: string;
}
```

**Purpose**: Type definition for user data

**Properties**:
| Property | Type | Description |
|----------|------|-------------|
| `id` | number | Unique user identifier |
| `firstName` | string | User's first name |
| `lastName` | string | User's last name |

---

## Routing System

### Route Flow

```
Application Start
        ↓
    / (default)
        ↓
    Redirect to /login
        ↓
    LoginComponent (User Authentication)
        ↓
    /login route active
        ↓
    User submits login form
        ↓
    Navigate to /courses
        ↓
    CoursesComponent (Display courses)
```

### Route Definitions

```typescript
export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'courses', 
    component: CoursesComponent 
  }
];
```

### Navigation Examples

```typescript
// In a component, inject Router
constructor(private router: Router) {}

// Navigate to courses page
this.router.navigate(['/courses']);

// Navigate to login
this.router.navigate(['/login']);

// Check current route
this.router.url === '/login'  // Returns boolean
```

---

## Code Explanation

### Bootstrap Process (main.ts)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**Flow**:
1. `bootstrapApplication()` initializes Angular application
2. Loads `AppComponent` as root component
3. Applies `appConfig` (routing, zone detection)
4. Renders app in `<app-root>` selector in `index.html`

---

### Standalone Components Explanation

**What are Standalone Components?**

Standalone components are self-contained components that don't require NgModule declarations.

**Syntax**:
```typescript
@Component({
  selector: 'app-example',
  standalone: true,  // ← Mark as standalone
  imports: [CommonModule, FormsModule],  // ← Import dependencies directly
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  // ...
}
```

**Benefits**:
- Simpler, more intuitive syntax
- Easier dependency management
- Better tree-shaking (smaller bundle size)
- Clearer component dependencies

---

### Two-Way Data Binding

**Example from Login Component**:
```html
<input 
  [(ngModel)]="email" 
  name="email"
>
```

**How it works**:
```
User types in input
        ↓
Template updates property (email)
        ↓
Property changes trigger template update
        ↓
Input displays updated value
```

---

### Component Communication with @Input

**Parent to Child - Passing Data**:

```typescript
// Parent Component
export class CoursesComponent {
  courses: Course[] = [
    { id: 1, title: 'Angular Basics', ... }
  ];
}
```

```html
<!-- Parent Template -->
<app-course-list [courses]="courses"></app-course-list>
```

```typescript
// Child Component
export class CourseListComponent {
  @Input() courses: Course[] = [];
}
```

**Data Flow**: Parent → Child through property binding `[courses]`

---

### Conditional Rendering (*ngIf)

**Example from AppComponent**:
```html
<!-- Hide header on login page -->
<app-header *ngIf="!isLoginPage()"></app-header>

<!-- Show footer except on login page -->
<app-footer *ngIf="!isLoginPage()"></app-footer>
```

**Logic**:
- `isLoginPage()` returns `true` if URL is `/login`
- `*ngIf="!isLoginPage()"` means "render if NOT on login page"

---

### Event Binding

**Login Form Submission**:
```html
<form (ngSubmit)="onLogin()">
  <!-- Form inputs -->
  <button type="submit">Login</button>
</form>
```

**Process**:
1. User submits form (clicks button)
2. `(ngSubmit)` triggers `onLogin()` method
3. Component processes login logic

---

## Build & Run Commands

### Development Server

```bash
npm start
# or
ng serve
```

**Result**: 
- Compiles application
- Serves at `http://localhost:4200/`
- Hot-reload on file changes

---

### Production Build

```bash
npm run build
# or
ng build
```

**Result**:
- Optimized production build
- Output: `dist/agmp-tests/`
- Minified and tree-shaken

---

### Testing Commands

**Unit Tests (Jest)**:
```bash
npm test                 # Run tests once
npm run test:watch     # Watch mode
npm run test:coverage  # With coverage report
```

**End-to-End Tests (Cypress)**:
```bash
npm run cypress:open   # Interactive test runner
npm run cypress:run    # Headless execution
```

---

## Summary

This Angular course management application demonstrates:

✅ **Modern Angular Architecture**: Standalone components, no NgModules
✅ **Routing**: Multi-page navigation with lazy loading capability
✅ **Data Flow**: Smart parent components, dumb child components
✅ **Type Safety**: TypeScript interfaces for Course and User
✅ **Best Practices**: Modular structure, separation of concerns
✅ **Responsive Design**: SCSS styling with mobile support
✅ **Testing**: Jest and Cypress configuration ready
✅ **Performance**: Event coalescing, change detection optimization

The application is production-ready and can be extended with:
- Database integration for persistent course storage
- Authentication service with JWT tokens
- Course filtering and search functionality
- User profile management
- Course enrollment system
