# Angular Course Management System - Implementation Guide

This document provides an overview of the implemented features for the Course Management System.

## Project Structure

```
src/app/
├── services/
│   ├── course.service.ts          # Course management service
│   ├── course.service.spec.ts     # Course service unit tests
│   ├── auth.service.ts            # Authentication service
│   └── auth.service.spec.ts       # Auth service unit tests
├── components/
│   ├── login/
│   │   ├── login.component.ts     # Login page component
│   │   ├── login.component.html   # Login form template
│   │   └── login.component.scss   # Login page styles
│   ├── courses/
│   │   ├── courses.component.ts   # Courses listing component
│   │   ├── courses.component.html # Courses template
│   │   ├── courses.component.scss # Courses styles
│   │   └── courses.component.spec.ts # Courses component tests
│   └── confirm-dialog/
│       ├── confirm-dialog.component.ts     # Confirmation dialog
│       ├── confirm-dialog.component.html   # Dialog template
│       └── confirm-dialog.component.scss   # Dialog styles
├── app.routes.ts                  # Application routing
├── app.config.ts                  # Application configuration
└── app.component.ts               # Root component
```

## Services

### 1. CourseService
**Location:** `src/app/services/course.service.ts`

Manages course data with CRUD operations and search functionality.

#### Key Methods:
- `getCourses()`: Returns observable of all courses
- `getCourseById(id)`: Get a single course by ID
- `addCourse(course)`: Add a new course
- `updateCourse(id, updates)`: Update course details
- `deleteCourse(id)`: Delete a course
- `searchCourses(query)`: Search courses by title or description

#### Data Model:
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  students: number;
  createdAt: Date;
}
```

**Test Coverage:** 35+ test cases covering all CRUD operations, search functionality, and observable emissions.

---

### 2. AuthService
**Location:** `src/app/services/auth.service.ts`

Handles user authentication and authorization.

#### Key Methods:
- `login(email, password)`: Authenticate user
- `register(email, password, firstName, lastName)`: Create new user account
- `logout()`: Clear authentication state
- `isAuthenticated()`: Check if user is logged in
- `getCurrentUser()`: Get current user info
- `getToken()`: Get authentication token
- `getAuthState()`: Get auth state as observable

#### Data Models:
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
```

**Demo Credentials:**
- Email: `john@example.com`
- Password: `password123`

**Test Coverage:** 45+ test cases covering authentication flows, state management, and edge cases.

---

## Components

### 1. LoginComponent
**Location:** `src/app/components/login/`

A responsive login page with form validation and error handling.

#### Features:
- Email and password validation
- Password visibility toggle
- Error message display
- Loading state
- Demo credentials helper button
- Responsive design

#### Routing:
- Route: `/login`
- Redirect: From `/` to `/login` by default

---

### 2. CoursesComponent
**Location:** `src/app/components/courses/`

Displays all courses with delete functionality and confirmation dialog.

#### Features:
- Display courses in a grid layout
- Delete course with confirmation dialog
- Loading and error states
- Responsive design
- Course information display (instructor, duration, students, created date)

#### Routing:
- Route: `/courses`
- Navigates here after successful login

---

### 3. ConfirmDialogComponent
**Location:** `src/app/components/confirm-dialog/`

Reusable confirmation dialog component using Angular CDK Dialog.

#### Features:
- Customizable title and message
- Configurable button text
- Returns boolean result (true = confirmed, false = cancelled)
- Clean, professional UI

#### Usage:
```typescript
const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  width: '400px',
  data: {
    title: 'Delete Course',
    message: 'Are you sure?',
    confirmText: 'Delete',
    cancelText: 'Cancel'
  }
});

dialogRef.closed.subscribe(result => {
  if (result === true) {
    // Confirmed action
  }
});
```

---

## Delete Action with Confirmation

The delete functionality is implemented in the **CoursesComponent** with the following flow:

1. **User clicks Delete button** on a course card
2. **Confirmation Dialog opens** showing:
   - Course name
   - Warning message
   - Delete/Cancel buttons
3. **If user confirms:**
   - Course is deleted via CourseService
   - CourseService updates the observable
   - UI automatically updates (course removed from grid)
4. **If user cancels:**
   - Dialog closes without any action

### Implementation Details:
```typescript
// CoursesComponent.ts
onDeleteCourse(course: Course): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Delete Course',
      message: `Are you sure you want to delete "${course.title}"?`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }
  });

  dialogRef.closed.subscribe(result => {
    if (result === true) {
      this.courseService.deleteCourse(course.id);
    }
  });
}
```

---

## Unit Tests

### CourseService Tests (`course.service.spec.ts`)
- ✅ Service creation
- ✅ getCourses() - returns observable
- ✅ getCourseById() - retrieves single course
- ✅ addCourse() - adds new course with unique ID
- ✅ updateCourse() - updates existing course
- ✅ deleteCourse() - removes course
- ✅ searchCourses() - case-insensitive search
- ✅ Observable emissions on data changes

**Total Test Cases:** 35+

### AuthService Tests (`auth.service.spec.ts`)
- ✅ Service creation
- ✅ Initial unauthenticated state
- ✅ login() - success and failure scenarios
- ✅ register() - new user registration
- ✅ logout() - clear auth state
- ✅ isAuthenticated() - authentication check
- ✅ getCurrentUser() - retrieve user info
- ✅ getToken() - token management
- ✅ Observable state emissions
- ✅ Edge cases and error handling

**Total Test Cases:** 45+

### CoursesComponent Tests (`courses.component.spec.ts`)
- ✅ Component creation
- ✅ Load courses on initialization
- ✅ Delete confirmation dialog interaction
- ✅ Delete on confirmation
- ✅ Cancel delete operation
- ✅ Dialog data validation
- ✅ Error and loading states
- ✅ Component cleanup

**Total Test Cases:** 15+

---

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Application Flow

1. **Application Start**
   - User navigates to `/`
   - Redirected to `/login`

2. **Login Page**
   - User enters credentials
   - Form validates email and password
   - On submit, AuthService authenticates user
   - On success, navigates to `/courses`

3. **Courses Page**
   - Courses are loaded and displayed in grid
   - User can view course details
   - User can delete course with confirmation
   - On logout, returns to login page

---

## Dependencies

The following dependencies are required:

```json
{
  "@angular/cdk": "^19.1.0",
  "@angular/forms": "^19.1.0",
  "@angular/router": "^19.1.0",
  "rxjs": "~7.8.0"
}
```

**Note:** `@angular/cdk` has been added to package.json for dialog functionality.

---

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm start
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## Design Patterns Used

1. **Services (Dependency Injection)**: CourseService and AuthService follow Angular's DI pattern
2. **Observable Pattern**: Services use RxJS observables for reactive data flow
3. **Standalone Components**: All components use standalone API (Angular 19+)
4. **Reactive Forms**: LoginComponent uses ReactiveFormsModule for form validation
5. **State Management**: AuthService manages application auth state using BehaviorSubject

---

## Features Summary

✅ **CourseService** - Complete CRUD operations with 35+ unit tests
✅ **AuthService** - User authentication with 45+ unit tests
✅ **Login Page** - Professional UI with validation and demo credentials
✅ **Courses Page** - Grid layout with course information
✅ **Delete with Confirmation** - Safe delete operations with confirmation dialog
✅ **Unit Tests** - Comprehensive test coverage for all services
✅ **Error Handling** - Proper error states and messages
✅ **Responsive Design** - Mobile-friendly layouts

---

## Next Steps (Future Enhancements)

- Add route guards for authentication
- Implement course filtering and sorting
- Add edit course functionality
- Implement pagination
- Add backend API integration
- Enhanced error logging
- User profile management
- Course enrollment functionality

---

**Project Created:** 2026
**Angular Version:** 19.1.0
**TypeScript Version:** 5.7.2
