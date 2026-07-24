# HTTP in Angular - Complete Guide

## Table of Contents
1. [What is HTTP?](#what-is-http)
2. [Why We Use HTTP](#why-we-use-http)
3. [Benefits of HTTP](#benefits-of-http)
4. [HTTP Methods](#http-methods)
5. [Where HTTP is Used in Our Project](#where-http-is-used-in-our-project)
6. [Implementation Details](#implementation-details)
7. [Best Practices](#best-practices)

---

## What is HTTP?

**HTTP** stands for **HyperText Transfer Protocol**. It's a stateless, application-level protocol used for transferring data between a client (browser/frontend) and a server (backend).

### Key Characteristics:
- **Stateless Protocol**: Each request is independent; the server doesn't retain client state
- **Request-Response Model**: Client sends a request, server responds
- **Text-Based Protocol**: Uses plain text for headers and requests
- **Extensible**: Supports various content types (JSON, XML, HTML, etc.)

---

## Why We Use HTTP

### 1. **Client-Server Communication**
   - Enables Angular frontend to communicate with backend services
   - Transfers data needed for application functionality

### 2. **Standard Web Protocol**
   - Universally supported across all browsers and servers
   - Industry standard for web communication
   - Well-defined specification (RFC 7231)

### 3. **Data Exchange**
   - Fetch user data from database
   - Send authentication credentials
   - Submit form data
   - Retrieve dynamic content

### 4. **RESTful APIs**
   - Build structured APIs using HTTP verbs (GET, POST, PUT, DELETE)
   - Create predictable endpoints for different operations

---

## Benefits of HTTP

| Benefit | Description |
|---------|-------------|
| **Stateless** | No session data stored on server; scalable for multiple requests |
| **Cacheable** | Responses can be cached to improve performance |
| **Flexible** | Supports any type of data format (JSON, XML, plain text) |
| **Lightweight** | Minimal overhead; uses standard headers |
| **Secure (HTTPS)** | Encrypted version ensures data privacy |
| **Standardized** | Widely understood and implemented across platforms |
| **Independent Requests** | Each request is complete and can stand alone |
| **Content Negotiation** | Client and server can agree on data format |
| **Status Codes** | Clear feedback about request results (200, 404, 500, etc.) |

---

## HTTP Methods

### GET
- **Purpose**: Retrieve data from server
- **Use Case**: Fetch user list, get course details
- **Body**: No request body
- **Example**: `GET /api/courses` → Returns list of courses

### POST
- **Purpose**: Create new resource on server
- **Use Case**: Register user, create new course
- **Body**: Contains data to create
- **Example**: `POST /auth/register` → Creates new user account

### PUT
- **Purpose**: Update entire resource
- **Use Case**: Update course details completely
- **Body**: Contains updated data
- **Example**: `PUT /courses/:id` → Updates specific course

### DELETE
- **Purpose**: Remove resource from server
- **Use Case**: Delete a course, remove user
- **Body**: Usually empty
- **Example**: `DELETE /courses/:id` → Removes course

### PATCH
- **Purpose**: Partially update resource
- **Use Case**: Update only one field of a course
- **Body**: Contains partial data
- **Example**: `PATCH /courses/:id` → Updates specific fields

---

## Where HTTP is Used in Our Project

### 1. **Authentication Module** (`src/app/core/auth/`)

#### Auth Service
```typescript
// src/app/services/auth.service.ts
login(username: string, password: string): Observable<AuthState> {
  return this.http.post<APIAuthResponse>(
    `${this.apiUrl}/auth/login`,        // HTTP POST to login endpoint
    { username, password }               // Send credentials
  ).pipe(
    tap(response => {
      // Handle successful login
      this.localStorage.setItem('authToken', response.token);
    }),
    catchError(error => {
      // Handle login errors
      console.error('Login failed:', error);
      throw error;
    })
  );
}
```

**HTTP Requests Used:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/userinfo` - Fetch user information
- `POST /auth/refresh` - Refresh authentication token
- `POST /auth/logout` - User logout

---

### 2. **Course Service** (`src/app/services/course.service.ts`)

#### Course Management
```typescript
// Fetch all courses with pagination
getCourses(page: number, limit: number): Observable<Course[]> {
  return this.http.get<Course[]>(
    `${this.apiUrl}/courses?page=${page}&limit=${limit}`
  );
}

// Search courses
searchCourses(query: string): Observable<Course[]> {
  return this.http.get<Course[]>(
    `${this.apiUrl}/courses/search?q=${query}`
  );
}

// Get single course
getCourseById(id: string): Observable<Course> {
  return this.http.get<Course>(
    `${this.apiUrl}/courses/${id}`
  );
}

// Create new course (Admin only)
createCourse(course: Course): Observable<Course> {
  return this.http.post<Course>(
    `${this.apiUrl}/courses`,
    course
  );
}

// Update course
updateCourse(id: string, course: Course): Observable<Course> {
  return this.http.put<Course>(
    `${this.apiUrl}/courses/${id}`,
    course
  );
}

// Delete course
deleteCourse(id: string): Observable<void> {
  return this.http.delete<void>(
    `${this.apiUrl}/courses/${id}`
  );
}
```

**HTTP Requests Used:**
- `GET /courses` - Retrieve all courses
- `GET /courses/:id` - Get specific course details
- `GET /courses/search` - Search courses
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

---

### 3. **HTTP Interceptor** (`src/app/core/auth/auth.interceptor.ts`)

#### Automatic Token Injection
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get auth token
    const token = this.authService.getToken();
    
    if (token) {
      // Add Authorization header to all requests
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}
```

**Purpose**: Automatically adds authentication token to all HTTP requests

---

### 4. **Component Usage**

#### Login Component
```typescript
// src/app/components/login/login.component.ts
onLogin() {
  this.authService.login(username, password).subscribe({
    next: (authState) => {
      // HTTP request successful
      this.router.navigate(['/courses']);
    },
    error: (error) => {
      // HTTP request failed
      this.showError('Login failed');
    }
  });
}
```

#### Courses Component
```typescript
// src/app/components/courses/courses.component.ts
ngOnInit() {
  // HTTP GET request to fetch courses
  this.courseService.getCourses(1, 10).subscribe({
    next: (courses) => {
      this.courses = courses;
    },
    error: (error) => {
      console.error('Failed to load courses', error);
    }
  });
}
```

---

## Implementation Details

### HTTP Client Setup

#### Module Configuration
```typescript
// src/app/app.config.ts
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // ... other providers
  ]
};
```

#### API URL Configuration
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3004'  // Mock backend server
};
```

### Error Handling

```typescript
// Handle HTTP errors
this.http.get('/api/courses').subscribe({
  next: (data) => console.log('Success:', data),
  error: (error) => {
    if (error.status === 401) {
      // Unauthorized - redirect to login
    } else if (error.status === 404) {
      // Not found
    } else if (error.status === 500) {
      // Server error
    }
  }
});
```

### Request/Response Cycle

```
User Action
    ↓
Angular Component calls Service Method
    ↓
Service creates HTTP request
    ↓
HttpClient sends request over network
    ↓
Backend Server receives and processes request
    ↓
Server sends HTTP response
    ↓
Angular receives response
    ↓
Operators (map, tap, catchError) process data
    ↓
Component receives data via Observable
    ↓
UI updates with new data
```

---

## Best Practices

### 1. **Use HttpClient**
```typescript
// ✓ Good - Use HttpClient for HTTP requests
constructor(private http: HttpClient) {}

// ✗ Bad - Don't use XMLHttpRequest directly
const xhr = new XMLHttpRequest();
```

### 2. **Handle Errors Properly**
```typescript
// ✓ Good - Handle all error cases
this.http.get('/api/data').subscribe({
  next: (data) => this.data = data,
  error: (error) => this.handleError(error),
  complete: () => this.loading = false
});
```

### 3. **Use RxJS Operators**
```typescript
// ✓ Good - Use operators for data transformation
this.http.get('/api/courses').pipe(
  map(courses => courses.filter(c => c.price > 50)),
  catchError(error => of([])),
  finalize(() => this.loading = false)
).subscribe(data => this.courses = data);
```

### 4. **Unsubscribe to Prevent Memory Leaks**
```typescript
// ✓ Good - Unsubscribe in ngOnDestroy
ngOnDestroy() {
  this.subscription.unsubscribe();
}

// Or use async pipe in template
// *ngIf="courses$ | async as courses"
```

### 5. **Add Request Timeouts**
```typescript
// ✓ Good - Set timeout for requests
this.http.get('/api/courses').pipe(
  timeout(5000)  // 5 second timeout
).subscribe(data => this.courses = data);
```

### 6. **Use Interceptors for Common Tasks**
- Authentication token injection
- Error handling
- Request logging
- Response transformation

---

## Project Architecture

```
Angular App
    ↓
Components (Login, Courses, etc.)
    ↓
Services (AuthService, CourseService)
    ↓
HttpClient
    ↓
HttpInterceptor (Add auth token)
    ↓
HTTP Requests
    ↓
Backend API (Mock Server: localhost:3004)
    ↓
Database / Storage
```

---

## Mock Server API Endpoints

Our project uses a mock backend server running on `http://localhost:3004`:

### Authentication Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| GET | `/auth/userinfo` | Get user information |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/logout` | User logout |

### Course Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get course by ID |
| GET | `/courses/search` | Search courses |
| POST | `/courses` | Create new course |
| PUT | `/courses/:id` | Update course |
| DELETE | `/courses/:id` | Delete course |

---

## Running the Application

### Start Mock Backend Server
```bash
node mock-server.js
```

### Start Angular Dev Server
```bash
npm start
```

### Run Tests
```bash
npm test
```

---

## Summary

- **HTTP** is the foundation of communication between Angular frontend and backend servers
- It uses a **request-response model** with standard methods (GET, POST, PUT, DELETE)
- **HttpClient** in Angular simplifies HTTP requests and integrates with RxJS Observables
- Our project uses HTTP for **authentication, course management, and data synchronization**
- **Interceptors** automatically handle common tasks like adding authentication tokens
- Proper **error handling** and **unsubscription** are essential for robust applications

---

**Created**: June 15, 2026  
**Project**: Angular HTTP Course Management Application  
**Branch**: angular-HTTP
