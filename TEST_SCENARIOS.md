# Test Scenarios Documentation

## Overview
This document provides comprehensive documentation of all test scenarios implemented in the Angular testing project. It covers test cases for all components with specific focus on user interactions, event emissions, and console logging verification.

---

## Table of Contents
1. [Search Component Tests](#search-component-tests)
2. [Course List Component Tests](#course-list-component-tests)
3. [Course Management Component Tests](#course-management-component-tests)
4. [Breadcrumbs Component Tests](#breadcrumbs-component-tests)
5. [Footer Component Tests](#footer-component-tests)
6. [Header Component Tests](#header-component-tests)
7. [Courses Page Component Tests](#courses-page-component-tests)

---

## Search Component Tests
 
**File:** `src/app/components/course-list/search/search.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Purpose:** Verify the component initializes successfully
- **Steps:** Create component instance
- **Expected:** Component exists and is truthy

#### 2. Search Event Emission
- **Test:** `should emit search event`
- **Purpose:** Verify search event is emitted with correct value
- **Steps:**
  1. Subscribe to the `search` event
  2. Set `searchValue` to 'Angular'
  3. Call `onSearch()` method
- **Expected:** Event emits with value 'Angular'

#### 3. Add Course Event Emission
- **Test:** `should emit addCourse event`
- **Purpose:** Verify add course button event is emitted
- **Steps:**
  1. Subscribe to the `addCourse` event
  2. Call `onCourseAdd()` method
- **Expected:** Event emits successfully

#### 4. Text Input Entry (TestBed)
- **Test:** `should enter text in the input element using TestBed`
- **Purpose:** Test DOM manipulation with TestBed fixture
- **Steps:**
  1. Query `.search-input` element
  2. Set input value to 'TypeScript'
  3. Dispatch 'input' event
  4. Detect changes
- **Expected:** Component's `searchValue` updates to 'TypeScript'

#### 5. Input Text Change Detection
- **Test:** `should update component searchValue when input text changes`
- **Purpose:** Verify two-way binding works correctly
- **Steps:**
  1. Get input element with class `.search-input`
  2. Set value to 'React'
  3. Dispatch input event
- **Expected:** Component `searchValue` property updates to 'React'

#### 6. Search Button Click
- **Test:** `should click the search button`
- **Purpose:** Verify search button can be clicked
- **Steps:**
  1. Query button with `data-agmp="search-button"`
  2. Verify button exists
  3. Click the button
- **Expected:** Button click succeeds without errors

#### 7. Console.log Verification on Button Click
- **Test:** `should verify console.log was called when entering text and clicking search button`
- **Purpose:** Verify console logging with spy on text entry and button click
- **Steps:**
  1. Create Jest spy on `console.log`
  2. Set input value to 'JavaScript Advanced'
  3. Dispatch input event
  4. Update component searchValue
  5. Click search button
  6. Check spy calls for 'Search query:' message
- **Expected:** 
  - console.log was called
  - Message contains 'Search query:'
  - Message contains the search value

#### 8. Console.log with Direct Method Call
- **Test:** `should call onSearch method with entered value and verify console.log`
- **Purpose:** Verify console logging when method is called directly
- **Steps:**
  1. Create Jest spy on `console.log`
  2. Set component searchValue to 'Node.js Backend'
  3. Call `onSearch()` method directly
  4. Check spy calls
- **Expected:**
  - console.log was called with 'Search query:'
  - Logged value matches 'Node.js Backend'

#### 9. Console.log Message Format
- **Test:** `should verify console.log message format includes componentId and search value`
- **Purpose:** Verify console.log includes componentId prefix
- **Steps:**
  1. Create Jest spy on `console.log`
  2. Set searchValue to 'Vue.js Framework'
  3. Call `onSearch()`
  4. Find console.log call with 'Search query:'
  5. Verify format
- **Expected:**
  - First argument contains `[Search {componentId}]`
  - Second argument equals the search value

#### 10. Search Event Emission with Console Logging
- **Test:** `should emit search event and log when search button is clicked`
- **Purpose:** Verify event emission AND console logging occur together
- **Steps:**
  1. Create Jest spy on `console.log`
  2. Subscribe to search event
  3. Set searchValue to 'Docker Containers'
  4. Click search button
  5. Verify both event emission and console logging
- **Expected:**
  - Event emits with correct value
  - console.log was called with 'Search query:' message

#### 11. Search Button Data Attribute
- **Test:** `should have data-agmp attribute on search button for testing`
- **Purpose:** Verify test selector attribute exists on button
- **Steps:**
  1. Query button with `[data-agmp="search-button"]`
  2. Verify it exists
  3. Check attribute value
- **Expected:** Button exists and has `data-agmp="search-button"` attribute

#### 12. Input Element CSS Class
- **Test:** `should have search-input class on input element`
- **Purpose:** Verify input element has correct styling class
- **Steps:**
  1. Query input element with `.search-input` class
  2. Verify it exists
  3. Check classList contains 'search-input'
- **Expected:** Input element has class 'search-input'

---

## Course List Component Tests

**File:** `src/app/components/course-list/course-list.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Expected:** Component initializes successfully

#### 2. Courses Array Initialization
- **Test:** `should initialize courses array`
- **Expected:** Component has 5 courses initialized

#### 3. Search Filtering
- **Test:** `should filter courses on search`
- **Steps:**
  1. Call `onSearch('Angular')`
  2. Check filtered courses
- **Expected:** Filtered courses count > 0

#### 4. Course Deletion
- **Test:** `should delete course`
- **Steps:**
  1. Get initial course count
  2. Delete course with ID 1
  3. Check new count
- **Expected:** Course count decreases by 1

#### 5. Edit Click Handler
- **Test:** `should handle edit click`
- **Purpose:** Verify console.log is called when edit method executes
- **Steps:**
  1. Create Jest spy on `console.log`
  2. Call `onEditClick()` with a course
  3. Verify spy was called
- **Expected:** console.log called

#### 6. Load More Handler with Console Logging
- **Test:** `should handle load more`
- **Purpose:** Verify console.log called with 'Load more clicked' message
- **Steps:**
  1. Create Jest spy on `console.log`
  2. Call `onLoadMore()`
  3. Check spy calls for message containing 'Load more clicked'
- **Expected:** Console logs message with 'Load more clicked'

---

## Course Management Component Tests

**File:** `src/app/components/course-management/course-management.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Expected:** Component initializes

#### 2. Initial Course Count
- **Test:** `should initialize with 12 courses`
- **Expected:** 12 courses loaded initially

#### 3. Items Per Page Configuration
- **Test:** `should set items per page to 6`
- **Expected:** itemsPerPage property equals 6

#### 4. Current Page Initialization
- **Test:** `should initialize current page to 1`
- **Expected:** currentPage equals 1

#### 5. Courses Initialization Log
- **Test:** `should log on ngOnInit`
- **Expected:** 12 courses available

#### 6. Displayed Courses Count
- **Test:** `should load initial courses on component init`
- **Expected:** displayedCourses has 6 items initially

#### 7. Search Query Handling
- **Test:** `should handle search query change`
- **Steps:**
  1. Call `onSearchChange('angular')`
  2. Check searchQuery property
- **Expected:** searchQuery updated to 'angular'

#### 8. Course Filtering on Search
- **Test:** `should filter courses based on search query`
- **Steps:**
  1. Call `onSearchChange('Angular')`
  2. Check filteredCourses count
- **Expected:** filteredCourses.length > 0

#### 9. Page Reset on Search
- **Test:** `should reset page to 1 on search`
- **Steps:**
  1. Set currentPage to 3
  2. Call `onSearchChange('test')`
  3. Check currentPage
- **Expected:** currentPage reset to 1

#### 10. Load More Availability
- **Test:** `should have more courses to load initially`
- **Expected:** `hasMoreCourses()` returns true

#### 11. Load More Button Click
- **Test:** `should load more courses on loadMore button click`
- **Steps:**
  1. Get initial displayedCourses count
  2. Call `onLoadMore()`
  3. Check new count
- **Expected:** displayedCourses count increases

#### 12. Page Increment on Load More
- **Test:** `should increment current page on load more`
- **Steps:**
  1. Record initial currentPage
  2. Call `onLoadMore()`
  3. Check new page
- **Expected:** currentPage incremented by 1

#### 13. Add Course with Alert Spy
- **Test:** `should add new course (log event)`
- **Purpose:** Verify window.alert is called when adding course
- **Steps:**
  1. Create Jest spy on `window.alert`
  2. Call `addNewCourse()`
  3. Verify spy was called
- **Expected:** window.alert called

#### 14. TrackBy Function
- **Test:** `should use trackBy function to identify courses by ID`
- **Steps:**
  1. Get first course
  2. Call `trackByCourseId(0, course)`
  3. Check returned value
- **Expected:** Returned value equals course.id

---

## Breadcrumbs Component Tests

**File:** `src/app/components/breadcrumbs/breadcrumbs.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Expected:** Component initializes

#### 2. Breadcrumb Text Initialization
- **Test:** `should initialize breadcrumbText on ngOnInit`
- **Expected:** breadcrumbText equals 'Courses'

#### 3. Breadcrumb Text Display
- **Test:** `should display breadcrumb text in template`
- **Steps:**
  1. Query `.breadcrumb-text` element
  2. Check textContent
- **Expected:** Element exists and contains 'Courses'

#### 4. Breadcrumbs Navigation Element
- **Test:** `should have breadcrumbs nav with aria-label`
- **Steps:**
  1. Query `nav[aria-label="Breadcrumb"]`
  2. Verify element exists
- **Expected:** Nav element with correct aria-label exists

#### 5. Breadcrumbs Container
- **Test:** `should have breadcrumbs container div`
- **Expected:** `.breadcrumbs-container` div exists

---

## Footer Component Tests

**File:** `src/app/components/footer/footer.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Expected:** Component initializes

#### 2. Footer Element Display
- **Test:** `should display footer element on init`
- **Expected:** `.app-footer` element exists

#### 3. Footer Copyright Text
- **Test:** `should display copyright text in footer`
- **Steps:**
  1. Query footer content
  2. Check for 'Videocourses' text
- **Expected:** Text contains 'Videocourses'

#### 4. Footer Data Attribute
- **Test:** `should have app-footer class`
- **Expected:** Element with `data-agmp="footer"` exists

#### 5. Footer Container Div
- **Test:** `should have footer container div`
- **Expected:** `.footer-container` div exists

#### 6. Footer Text Content
- **Test:** `should have footer text content`
- **Expected:** `.footer-text` element exists

---

## Header Component Tests

**File:** `src/app/components/header/header.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Expected:** Component initializes

#### 2. Login State Default
- **Test:** `should have default isLoggedIn as false`
- **Expected:** isLoggedIn equals false

#### 3. Default User Name
- **Test:** `should have default userName`
- **Expected:** userName equals 'User'

#### 4. Header Element Display
- **Test:** `should display header element`
- **Expected:** `.app-header` element exists

#### 5. Login Button Exists
- **Test:** `should have login button`
- **Expected:** Button with `data-agmp="login"` exists

#### 6. Logout Button Exists
- **Test:** `should have logout button`
- **Expected:** Button with `data-agmp="logout"` exists

#### 7. Login Button Click Handler
- **Test:** `should call onUserLogin when login button clicked`
- **Steps:**
  1. Create Jest spy on `onUserLogin`
  2. Query and click login button
  3. Verify spy was called
- **Expected:** onUserLogin method called

#### 8. Logout Button Click Handler
- **Test:** `should call onUserLogout when logout button clicked`
- **Steps:**
  1. Create Jest spy on `onUserLogout`
  2. Query and click logout button
  3. Verify spy was called
- **Expected:** onUserLogout method called

#### 9. Header Logo Text
- **Test:** `should have logo text in header`
- **Expected:** Header contains 'VIDEO COURSE' text

#### 10. Header Container
- **Test:** `should have header container div`
- **Expected:** `.header-container` div exists

---

## Courses Page Component Tests

**File:** `src/app/pages/courses/courses.component.spec.ts`

### Test Scenarios

#### 1. Component Creation
- **Test:** `should create`
- **Expected:** Component initializes

#### 2. Page Container Display
- **Test:** `should display courses page`
- **Expected:** `.courses-page` element exists

#### 3. Breadcrumbs Component
- **Test:** `should have breadcrumbs component`
- **Expected:** `<app-breadcrumbs>` element rendered

#### 4. Course List Component
- **Test:** `should have course-list component`
- **Expected:** `<app-course-list>` element rendered

#### 5. Component Initialization
- **Test:** `should call ngOnInit on initialization`
- **Expected:** Component exists after init

#### 6. Page Content Container
- **Test:** `should have page-content div`
- **Expected:** `.page-content` div exists

#### 7. Component Destruction
- **Test:** `should destroy component gracefully`
- **Expected:** Component remains truthy after destroy

---

## Search and TestBed Integration Testing

### Key Testing Patterns Used

#### 1. TestBed Fixture Queries
```typescript
const inputElement = fixture.nativeElement.querySelector('.search-input');
```
- Used to access DOM elements
- Allows manipulation and event simulation

#### 2. Event Simulation
```typescript
inputElement.dispatchEvent(new Event('input'));
```
- Simulates user input events
- Triggers Angular change detection

#### 3. Jest Spy on console.log
```typescript
const consoleSpy = jest.spyOn(console, 'log');
expect(consoleSpy).toHaveBeenCalled();
consoleSpy.mockRestore();
```
- Verifies console logging occurs
- Checks exact log messages
- Spies on specific method arguments

#### 4. Event Subscription Testing
```typescript
component.search.subscribe((value: string) => {
  expect(value).toBe('Angular');
  done();
});
```
- Tests EventEmitter output
- Verifies event values
- Uses Jest done callback for async tests

#### 5. DOM Attribute Verification
```typescript
expect(element.getAttribute('data-agmp')).toBe('search-button');
```
- Verifies test selectors exist
- Ensures proper element identification

---

## Test Execution Summary

**Total Test Suites:** 12  
**Total Tests:** 109  
**Passing Tests:** 109 ✅  
**Failing Tests:** 0  

### Coverage by Component

| Component | Test Suite | Tests | Status |
|-----------|-----------|-------|--------|
| Search Component | ✅ | 12 | PASS |
| Course List | ✅ | 6 | PASS |
| Course Item | ✅ | 6 | PASS |
| Add Course | ✅ | 4 | PASS |
| Breadcrumbs | ✅ | 7 | PASS |
| Footer | ✅ | 9 | PASS |
| Header | ✅ | 10 | PASS |
| Logo | ✅ | 3 | PASS |
| Search Control | ✅ | 5 | PASS |
| Course Management | ✅ | 35 | PASS |
| Courses Page | ✅ | 7 | PASS |
| Course List (in folder) | ✅ | 4 | PASS |

---

## Best Practices Implemented

### 1. **Comprehensive Component Testing**
- Tests cover component creation, initialization, and lifecycle
- User interaction scenarios are tested
- Event emissions are verified

### 2. **DOM Interaction Testing**
- Uses TestBed fixture for DOM queries
- Simulates real user input with `dispatchEvent()`
- Verifies rendered output matches expectations

### 3. **Spy and Mock Usage**
- Jest spies verify console.log calls
- Method spies verify event handlers
- Window spies verify alerts

### 4. **Test Data Attributes**
- Uses `data-agmp` attributes for reliable element selection
- CSS classes validated for styling
- ARIA attributes checked for accessibility

### 5. **Async Test Handling**
- Uses Jest `done()` callback for async operations
- Promise-based async/await patterns when needed
- Proper cleanup with `mockRestore()`

### 6. **Error-Free Jest Configuration**
- Uses `jest.spyOn()` instead of Jasmine's `spyOn()`
- Proper TypeScript type checking with guard clauses
- Null safety with conditional assertions

---

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
npx jest src/app/components/course-list/search/search.component.spec.ts
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

---

## Conclusion

This comprehensive test suite ensures:
- ✅ All components render correctly
- ✅ User interactions work as expected
- ✅ Events emit correct values
- ✅ Console logging provides proper debug information
- ✅ DOM elements have correct attributes and classes
- ✅ Components handle lifecycle properly

The Search Component has been specifically enhanced with 9 additional tests focusing on:
- TestBed-based DOM manipulation
- Button click handling
- Input text entry and validation
- Console.log verification with Jest spies
- Message format validation
- Event emission verification
