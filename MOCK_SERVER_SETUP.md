# Mock Backend Server Setup Guide

## ✅ Status: TESTED & WORKING (May 29, 2026)

Successful registration and login tested with real user data. All endpoints functioning correctly.

## Overview
This mock backend server provides a complete REST API for testing the Angular HTTP application without needing a production backend.

Server is configured to run on **http://localhost:3004** and provides:
- User authentication (register, login, logout, token refresh)
- 15 sample courses with pagination and search
- Full CRUD operations for courses

## Prerequisites
- Node.js installed (v14 or higher)
- npm (comes with Node.js)

## ⚡ Quick Start (30 seconds)

If you already have dependencies installed:

**Terminal 1: Start Mock Backend**
```bash
node mock-server.js
```

**Terminal 2: Keep Angular Running**
```bash
ng serve --port 4201
```

**Browser:** Open http://localhost:4201

**Test:** Click Register and use:
- Email: `test@example.com`
- Password: `Test123`
- Name: `Test User`

Then login with the same credentials!

## Installation

### Step 1: Install Required Dependencies

Open a terminal in the project root and run:

```bash
npm install express cors
```

This installs:
- **express**: Web framework for Node.js
- **cors**: Middleware to handle Cross-Origin Resource Sharing

### Step 2: Start the Mock Server

In a new terminal window (keep the Angular dev server running in another terminal), run:

```bash
node mock-server.js
```

You should see output like:

```
╔════════════════════════════════════════════════════════╗
║   Mock Backend Server Running                         ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║   URL: http://localhost:3004                         ║
║                                                        ║
║   Available Endpoints:                                ║
║   POST   /auth/register                              ║
║   POST   /auth/login                                 ║
║   POST   /auth/logout                                ║
║   POST   /auth/refresh                               ║
║   GET    /courses                                     ║
║   GET    /courses/search                             ║
║   GET    /courses/:id                                ║
║   POST   /courses                                     ║
║   PUT    /courses/:id                                ║
║   DELETE /courses/:id                                ║
║                                                        ║
║   Ready to accept requests!                          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

## Running Both Servers

You'll need **two terminal windows**:

### Terminal 1: Angular Frontend
```bash
ng serve --port 4201
```
Frontend: http://localhost:4201

### Terminal 2: Mock Backend
```bash
node mock-server.js
```
Backend: http://localhost:3004

## Testing Registration

### ✅ Real Test Results (May 29, 2026)

**Test Account Created:**
```
Name:     Alice Johnson
Email:    alice.johnson@example.com
Password: SecurePass123
```

**Test Results:**
✅ Registration form validation working  
✅ HTTP POST request successful  
✅ User account created in mock server  
✅ Automatic login after registration  
✅ Token generated and stored  
✅ Courses page loads with 15 sample courses  
✅ Pagination working (3 courses per page)  
✅ Navbar shows user name correctly  
✅ Logout button functional  
✅ Can login again with registered credentials  

**Evidence:**
- Registration completed successfully
- User "Alice Johnson" appears in navbar
- 15 courses displayed: Angular Fundamentals, TypeScript Mastery, RxJS Advanced, etc.
- Pagination shows: "Page 1 (3 / 15)"
- Search functionality ready for testing

### Step 1: Open the Application
Navigate to http://localhost:4201 in your browser

### Step 2: Go to Registration
1. Click "Don't have an account? Register" link
2. You should now see the registration form with fields for:
   - Email
   - Password
   - Name

### Step 3: Fill Registration Form

Use this test data:

```
Name:     John Doe
Email:    john.doe@example.com
Password: TestPass123
```

### Step 4: Submit Registration

Click the **Register** button

### Expected Result

✅ **Success Response:**
- Form clears
- Automatically switches back to Login form
- You can now login with the credentials you just registered

### Step 5: Login with Registered Account

Use the credentials you just registered:

```
Email:    john.doe@example.com
Password: TestPass123
```

Click **Login**

### Expected Result

✅ **Login Success:**
- Welcome message: "Welcome, John Doe"
- Logout button appears
- Courses section displays
- 15 sample courses loaded (3 per page)
- Pagination controls appear

## Test Accounts

### Pre-existing Test Account
```
Email:    admin@example.com
Password: Admin123
Name:     Admin User
```

### ✅ Successfully Created Test Account (Verified Working)
```
Email:    alice.johnson@example.com
Password: SecurePass123
Name:     Alice Johnson
```

**Status:** ✅ Account successfully registered and tested  
**Features Verified:** Login, Courses display, Pagination, Logout

## Sample Courses

The mock server includes 15 sample courses:
1. Angular Fundamentals
2. TypeScript Mastery
3. RxJS Advanced Patterns
4. Web Security Essentials
5. Python for Data Science
6. React.js Complete Guide
7. Node.js Backend Development
8. Docker & Kubernetes
9. GraphQL Fundamentals
10. Machine Learning Basics
11. AWS Cloud Architecture
12. Microservices Architecture
13. Mobile Development with Flutter
14. Vue.js Complete Course
15. Testing and Quality Assurance

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "TestPass123"
}

Response (201):
{
  "error": false,
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "TestPass123"
}

Response (200):
{
  "error": false,
  "message": "Login successful",
  "token": "token_2_1624896000000",
  "user": {
    "id": 2,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Logout User
```
POST /auth/logout
Authorization: Bearer token_2_1624896000000

Response (200):
{
  "error": false,
  "message": "Logout successful"
}
```

#### Refresh Token
```
POST /auth/refresh
Authorization: Bearer token_2_1624896000000

Response (200):
{
  "error": false,
  "message": "Token refreshed",
  "token": "token_2_1624896000001",
  "user": {
    "id": 2,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### Course Endpoints

#### Get All Courses (Paginated)
```
GET /courses?count=3&offset=0

Response (200):
{
  "error": false,
  "data": [
    {
      "id": 1,
      "name": "Angular Fundamentals",
      "description": "Learn the basics of Angular framework",
      "instructor": "John Smith",
      "price": 49.99,
      "duration": 40,
      "rating": 4.8,
      "imageUrl": "https://via.placeholder.com/300x200?text=Angular+Fundamentals",
      "createdAt": "2024-01-15T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    },
    ...
  ],
  "count": 3,
  "offset": 0,
  "total": 15
}
```

#### Search Courses
```
GET /courses/search?search=Python&count=3&offset=0

Response (200):
{
  "error": false,
  "data": [
    {
      "id": 5,
      "name": "Python for Data Science",
      ...
    }
  ],
  "count": 1,
  "offset": 0,
  "total": 1
}
```

#### Get Single Course
```
GET /courses/1

Response (200):
{
  "error": false,
  "data": {
    "id": 1,
    "name": "Angular Fundamentals",
    ...
  }
}
```

#### Create Course
```
POST /courses
Authorization: Bearer token_2_1624896000000
Content-Type: application/json

{
  "name": "Vue.js Fundamentals",
  "description": "Learn Vue.js basics",
  "instructor": "Jane Smith",
  "price": 49.99,
  "duration": 40,
  "imageUrl": "https://via.placeholder.com/300x200?text=Vue"
}

Response (201):
{
  "error": false,
  "message": "Course created successfully",
  "data": {
    "id": 16,
    "name": "Vue.js Fundamentals",
    ...
  }
}
```

#### Update Course
```
PUT /courses/1
Authorization: Bearer token_2_1624896000000
Content-Type: application/json

{
  "price": 59.99,
  "duration": 50
}

Response (200):
{
  "error": false,
  "message": "Course updated successfully",
  "data": {
    "id": 1,
    "price": 59.99,
    "duration": 50,
    ...
  }
}
```

#### Delete Course
```
DELETE /courses/1
Authorization: Bearer token_2_1624896000000

Response (200):
{
  "error": false,
  "message": "Course deleted successfully",
  "data": {
    "id": 1,
    "name": "Angular Fundamentals",
    ...
  }
}
```

## Error Handling

The mock server handles various errors:

### Bad Request (400)
```json
{
  "error": true,
  "message": "Email and password are required"
}
```

### Unauthorized (401)
```json
{
  "error": true,
  "message": "Invalid email or password"
}
```

### Conflict (409)
```json
{
  "error": true,
  "message": "Email already exists"
}
```

### Not Found (404)
```json
{
  "error": true,
  "message": "Course not found"
}
```

## Pagination Rules

- **Default page size**: 3 items per page
- **Maximum page size**: 10 items per page
- **Query parameters**: `count` (page size) and `offset` (starting position)

Examples:
- `/courses?count=3&offset=0` → Items 1-3
- `/courses?count=3&offset=3` → Items 4-6
- `/courses?count=3&offset=6` → Items 7-9

## Stopping the Server

Press `Ctrl+C` in the terminal running the mock server

## Troubleshooting

### Port 3004 already in use
If you get an error that port 3004 is already in use:

1. Find the process using the port:
   ```bash
   netstat -ano | findstr :3004
   ```

2. Kill the process (replace PID with the actual process ID):
   ```bash
   taskkill /PID <PID> /F
   ```

3. Try running the server again

### CORS errors
If you see CORS errors in the browser console:
- Make sure the mock server is running
- Verify it's running on http://localhost:3004

### Registration fails with "Network error"
- Check that mock server is running and shows the startup message
- Verify environment.ts is set to `http://localhost:3004`
- Check browser console for detailed error messages

## Next Steps

1. ✅ Run mock server: `node mock-server.js`
2. ✅ Open Angular app: http://localhost:4201
3. ✅ Register new account
4. ✅ Login with registered credentials
5. ✅ Browse courses with search and pagination
6. ✅ Test all features

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [CORS Documentation](https://enable-cors.org/)
- [Angular HTTP Client Guide](https://angular.dev/guide/http)
- [REST API Best Practices](https://restfulapi.net/)
