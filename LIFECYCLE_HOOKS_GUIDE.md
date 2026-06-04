# Lifecycle Hooks Debugging Guide

## Overview
This document explains how to debug and understand Angular lifecycle hooks in your application. Each component logs its lifecycle events to help you understand the order of execution.

## Lifecycle Hooks Implemented

### 1. **Constructor** 🔷
- Called first when the component is created
- Used to initialize properties, but NOT for complex logic
- Dependency injection happens here
- Receives input values at this time, but `@Input` properties are not yet set

```typescript
constructor() {
  console.log(`[Component] Constructor called`);
}
```

**Order in execution chain:** **First** (before ngOnInit)

### 2. **ngOnChanges** 🔶
- Called before ngOnInit and whenever an input property changes
- Receives a `SimpleChanges` object with old and new values
- **Only available** when component has `@Input` properties

```typescript
ngOnChanges(changes: SimpleChanges): void {
  console.log(`[Component] ngOnChanges called`, changes);
}
```

**Order in execution chain:** Before ngOnInit (if applicable)

### 3. **ngOnInit** 🟢
- Called once after the component is created and inputs are set
- Perfect place to initialize data, fetch from services, set up subscriptions
- **IMPORTANT:** Set courses array inside ngOnInit, NOT in constructor

```typescript
ngOnInit(): void {
  console.log(`[Component] ngOnInit called`);
  this.courses = [/* initialize data here */];
}
```

**Order in execution chain:** After constructor and ngOnChanges

### 4. **ngAfterViewInit** 🟡
- Called after the component's view (template) has been initialized
- ViewChild references are available now
- Used for direct DOM manipulation

```typescript
ngAfterViewInit(): void {
  console.log(`[Component] ngAfterViewInit called`);
}
```

**Order in execution chain:** After ngOnInit

### 5. **ngOnDestroy** 🔴
- Called when the component is about to be destroyed
- Used to clean up subscriptions, timers, and event listeners
- Prevents memory leaks

```typescript
ngOnDestroy(): void {
  console.log(`[Component] ngOnDestroy called`);
}
```

**Order in execution chain:** Last (when component is removed)

## Complete Lifecycle Order

```
1. Constructor() 🔷
     ↓
2. ngOnChanges() 🔶 (if @Input properties exist)
     ↓
3. ngOnInit() 🟢
     ↓
4. ngAfterViewInit() 🟡
     ↓
5. ngOnDestroy() 🔴 (when component is removed)
```

## How to Debug in Browser Console

### Step 1: Open Developer Tools
- Press **F12** or right-click → Inspect → Console tab

### Step 2: Look for Component Logs
Each component logs with a format like:
```
[CourseList 0.123456] Constructor called
[CourseList 0.123456] ngOnInit called - component initialized
[CourseItem 0.789012] Constructor called
[CourseItem 0.789012] ngOnChanges called
[CourseItem 0.789012] ngOnInit called - component initialized
[CourseItem 0.789012] ngAfterViewInit called - view initialized
```

### Step 3: Filter by Component
- Use the search box in console to filter by component name
- Example: type `CourseList` to see only CourseList logs
- Example: type `0.123456` to see all logs from that specific component instance

### Step 4: Analyze Timing
- Each log includes a timestamp
- Compare timestamps to understand execution order

## Key Components with Lifecycle Logging

### ✅ Course List Component
- Initializes courses array in ngOnInit
- Has trackBy function for ngFor optimization
- Logs all events with unique component ID

**File:** [src/app/components/course-list/course-list.component.ts](src/app/components/course-list/course-list.component.ts)

### ✅ Course Item Component
- Shows ngOnChanges being called when @Input course changes
- Demonstrates child component lifecycle in relation to parent
- Logs with component ID for tracking

**File:** [src/app/components/course-list/course-item/course-item.component.ts](src/app/components/course-list/course-item/course-item.component.ts)

### ✅ Search Component
- Logs lifecycle for sibling component communication
- Shows how search and courses components are initialized

**File:** [src/app/components/course-list/search/search.component.ts](src/app/components/course-list/search/search.component.ts)

### ✅ Breadcrumbs Component
- Simple lifecycle hook example
- Shows ngOnInit and ngOnDestroy flow

**File:** [src/app/components/breadcrumbs/breadcrumbs.component.ts](src/app/components/breadcrumbs/breadcrumbs.component.ts)

## ngFor Context Variables

### Available Variables (from `*ngFor="let course of courses; let index = index"`)

```html
<!-- First item in list -->
<div *ngIf="first">First course!</div>

<!-- Last item in list -->
<div *ngIf="last">Last course!</div>

<!-- Even indexed items (0, 2, 4, ...) -->
<div [class.even-row]="even">Even row</div>

<!-- Odd indexed items (1, 3, 5, ...) -->
<div [class.odd-row]="odd">Odd row</div>

<!-- Current index (0-based) -->
<div>Index: {{ index }}</div>

<!-- Unique tracking identifier -->
<div [attr.data-index]="index">Index {{index}}</div>
```

## TrackBy Function

### Why TrackBy Matters
- Without trackBy, Angular recreates DOM elements on every list update
- With trackBy, Angular reuses DOM elements and only updates changed data
- **Performance improvement:** Especially important for large lists

### Implementation
```typescript
trackByCourseId(index: number, course: Course): number {
  console.log(`trackByCourseId called for index ${index}, courseId ${course.id}`);
  return course.id; // Return unique identifier for each item
}
```

### In Template
```html
<app-course-item
  *ngFor="let course of filteredCourses; trackBy: trackByCourseId"
  [course]="course"
  (editItemEvent)="onEditClick($event)"
  (deleteItemEvent)="onDeleteClick($event)"
></app-course-item>
```

### Console Output with TrackBy
```
[CourseList 0.123456] trackByCourseId called for index 0, courseId 1
[CourseList 0.123456] trackByCourseId called for index 1, courseId 2
[CourseList 0.123456] trackByCourseId called for index 2, courseId 3
```

## Practical Tips

### ✅ DO:
- Initialize data in ngOnInit, not constructor
- Use trackBy function with *ngFor for performance
- Unsubscribe from observables in ngOnDestroy
- Use unique component IDs for console debugging
- Log with timestamps to track execution order

### ❌ DON'T:
- Don't make HTTP requests in constructor
- Don't forget to implement OnDestroy when using subscriptions
- Don't access @Input values in constructor (they're not set yet)
- Don't use ngFor without trackBy on large dynamic lists

## Testing Lifecycle Order

### Test 1: Initial Load
1. Open browser console
2. Refresh the page
3. Observe constructor → ngOnInit → ngAfterViewInit order

### Test 2: Search Filter
1. Type in the search box
2. Watch how courseList.onSearch updates filteredCourses
3. Observe ngOnChanges being called in course-item components

### Test 3: Delete Course
1. Click delete button on any course
2. Watch the course-item ngOnDestroy being called
3. See new course-item components being created if necessary

### Test 4: Component Destruction
1. Navigate away from the courses page
2. Watch ngOnDestroy being called for all components
3. This is where cleanup happens (unsubscribe, etc.)

## Related Files

- [src/app/components/course-list/course-list.component.ts](src/app/components/course-list/course-list.component.ts)
- [src/app/components/course-list/course-item/course-item.component.ts](src/app/components/course-list/course-item/course-item.component.ts)
- [src/app/components/course-list/course-list.component.html](src/app/components/course-list/course-list.component.html)

## References

- [Angular Lifecycle Hooks - Official Docs](https://angular.io/guide/lifecycle-hooks)
- [Angular Change Detection](https://angular.io/guide/change-detection)
- [Angular Performance Optimization](https://angular.io/guide/performance-best-practices)
