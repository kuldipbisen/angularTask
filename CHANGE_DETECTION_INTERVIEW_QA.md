# Angular Change Detection - Interview Questions & Answers

## Table of Contents
1. [Simple Questions](#simple-questions)
2. [Tricky Questions](#tricky-questions)
3. [Real-World Scenarios](#real-world-scenarios)

---

## Simple Questions

### Q1: What is Change Detection in Angular?
**Answer:**
Change Detection is Angular's mechanism to detect when data changes in the component and update the DOM accordingly. Angular monitors component properties and updates the view whenever values change. Every time something happens in the application (event, HTTP request, timer), Angular runs change detection to see if the DOM needs to be updated.

**Example:**
```typescript
export class CourseItemComponent {
  @Input() course!: Course;
  
  // When 'course' changes, Angular detects it and updates the view
}
```

---

### Q2: What are the two Change Detection Strategies in Angular?
**Answer:**
1. **Default (CheckAlways)**: Angular checks every component on every change detection cycle (when any event occurs).
2. **OnPush**: Angular only checks the component when:
   - An input property changes
   - An event is triggered in the component
   - An observable emits a value (with async pipe)

**Example:**
```typescript
// Default Strategy - checks on every change
@Component({
  selector: 'app-courses-list',
  changeDetection: ChangeDetectionStrategy.Default
})

// OnPush Strategy - checks only when inputs change
@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

---

### Q3: When should you use OnPush Change Detection Strategy?
**Answer:**
Use OnPush when:
- Component is a **presentational/dumb component** that only receives data via @Input
- Component doesn't modify data directly
- You want to **improve performance** by reducing unnecessary checks
- Component deals with immutable data

**Real Example from Project:**
```typescript
// CourseItemComponent uses OnPush because:
// - It only receives course data via @Input
// - It doesn't fetch data or modify state
// - It's a presentational component

@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course!: Course;
}
```

---

### Q4: What is Zone.js and what is its role in Change Detection?
**Answer:**
Zone.js is a library that Angular uses to intercept asynchronous operations (setTimeout, events, promises, etc.). When an async operation completes, Zone.js notifies Angular to run change detection.

**Example:**
```typescript
// In app.config.ts
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
```

---

### Q5: What is the difference between Smart and Dumb Components?
**Answer:**

| Aspect | Smart Component | Dumb Component |
|--------|-----------------|----------------|
| **Role** | Handles logic & state | Displays data only |
| **Data Flow** | Fetches data | Receives via @Input |
| **Change Detection** | Default | OnPush (recommended) |
| **Example** | CoursesListComponent | CourseItemComponent |
| **Dependency** | Services | None (usually) |

**From Project:**
```typescript
// Smart Component - handles logic
@Component({ selector: 'app-courses-list' })
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  
  ngOnInit(): void {
    this.loadCourses(); // Loads data
  }
}

// Dumb Component - just displays
@Component({ 
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CourseItemComponent {
  @Input() course!: Course; // Receives data
}
```

---

## Tricky Questions

### Q6: Why is OnPush Change Detection more performant than Default?
**Answer:**
OnPush reduces unnecessary change detection checks. With Default strategy, Angular checks EVERY component EVERY time ANYTHING changes. With OnPush, components are skipped unless their inputs change, reducing CPU usage and improving app performance.

**Performance Impact:**
```
Default Strategy:
User clicks button → Change Detection runs on ALL components

OnPush Strategy:
User clicks button → Change Detection runs on affected component + ancestors only
```

**Tricky Part:** Even with OnPush, if a parent component uses Default strategy, all children get checked regardless of their strategy.

---

### Q7: What happens if you use OnPush on a component but the parent passes mutated objects?
**Answer:**
**The component WON'T update!** OnPush checks for reference changes, not deep value changes. If you mutate an object in place, the reference stays the same, and OnPush won't trigger change detection.

**WRONG - Won't Work:**
```typescript
// In parent component
this.course.title = 'New Title'; // Mutation - reference same
// OnPush child won't detect this!
```

**CORRECT - Will Work:**
```typescript
// Create new reference
this.course = { ...this.course, title: 'New Title' };
// OnPush detects new reference
```

---

### Q8: Can OnPush Break Async Operations?
**Answer:**
Yes! If you use setTimeout, promises, or other async operations inside an OnPush component without proper handling, they may not trigger change detection.

**Problem:**
```typescript
@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  description = '';
  
  onView() {
    setTimeout(() => {
      // This won't trigger change detection!
      this.description = 'Updated after delay';
    }, 1000);
  }
}
```

**Solution 1 - Use ChangeDetectorRef:**
```typescript
import { ChangeDetectorRef } from '@angular/core';

export class CourseItemComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  
  onView() {
    setTimeout(() => {
      this.description = 'Updated after delay';
      this.cdr.markForCheck(); // Manually trigger CD
    }, 1000);
  }
}
```

**Solution 2 - Use Observable with Async Pipe:**
```typescript
description$ = new Observable(observer => {
  setTimeout(() => {
    observer.next('Updated after delay');
  }, 1000);
});

// Template: {{ description$ | async }}
```

---

### Q9: What is ChangeDetectorRef and when do you need it?
**Answer:**
ChangeDetectorRef is Angular's service to manually control change detection. You need it when:
1. Using OnPush with async operations
2. Detaching from change detection for performance
3. Manually triggering checks

**Key Methods:**
```typescript
import { ChangeDetectorRef } from '@angular/core';

export class MyComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  
  // Manually mark component for check on next cycle
  this.cdr.markForCheck();
  
  // Immediately run change detection for this component
  this.cdr.detectChanges();
  
  // Detach from automatic change detection
  this.cdr.detach();
  
  // Re-attach to automatic change detection
  this.cdr.reattach();
}
```

---

### Q10: What's the difference between detectChanges() and markForCheck()?
**Answer:**

| Method | When to Use | Effect |
|--------|------------|--------|
| **detectChanges()** | Need immediate update | Runs CD immediately for this component |
| **markForCheck()** | Need update on next cycle | Marks for check on next Angular CD cycle |

**Example:**
```typescript
// markForCheck() - waits for next cycle
setTimeout(() => {
  this.course.title = 'Updated';
  this.cdr.markForCheck(); // Will update on next CD cycle
}, 100);

// detectChanges() - runs immediately
setTimeout(() => {
  this.course.title = 'Updated';
  this.cdr.detectChanges(); // Updates NOW
}, 100);
```

---

### Q11: Tricky: What happens with this scenario?
```typescript
// Parent: Default CD
// Child: OnPush CD
// Parent async operation triggers

// Does the child update?
```

**Answer:**
YES, the child updates because:
1. Parent has Default strategy → it checks itself
2. Parent triggers change detection → all descendants are checked
3. Child's OnPush doesn't prevent parent from passing new @Input values
4. When @Input changes, child updates

BUT if only an internal parent property changes without changing @Input to child:
- Child WON'T update (OnPush protection works)

---

### Q12: Can you have a memory leak with manual change detection?
**Answer:**
YES! If you subscribe to observables and use markForCheck() without unsubscribing, you can leak memory.

**WRONG - Memory Leak:**
```typescript
export class CourseItemComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.courseService.courses$.subscribe(() => {
      this.cdr.markForCheck(); // Subscription never unsubscribed!
    }); // Memory leak
  }
}
```

**CORRECT:**
```typescript
export class CourseItemComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.courseService.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## Real-World Scenarios

### Scenario 1: Performance Optimization
**Question:** Your app has 1000 course items. The CoursesListComponent (parent) uses Default CD. What's the best practice?

**Answer:**
Make CourseItemComponent use OnPush because:
```typescript
@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course!: Course;
}
```

This prevents 999 unnecessary component checks when only one course property changes.

---

### Scenario 2: Event Handling with OnPush
**Question:** User clicks a button in an OnPush component. Will it update?

**Answer:**
YES - Events automatically trigger change detection. But if async code runs after the event:

```typescript
@Component({
  selector: 'app-course-item',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  count = 0;
  
  // ✅ Works - event triggers CD
  onClick() {
    this.count++;
  }
  
  // ❌ Doesn't work - async after event
  onClickAsync() {
    setTimeout(() => {
      this.count++; // Won't display!
    }, 0);
  }
}
```

---

### Scenario 3: Testing Change Detection
**Question:** In your test, changes don't appear. Why?

**Answer:**
You forgot `fixture.detectChanges()`:

```typescript
// ❌ Won't work
component.course = mockCourse;
expect(fixture.nativeElement.querySelector('.course-title')?.textContent)
  .toContain('Test Course'); // Fails!

// ✅ Works
component.course = mockCourse;
fixture.detectChanges(); // Runs CD
expect(fixture.nativeElement.querySelector('.course-title')?.textContent)
  .toContain('Test Course'); // Passes!
```

---

## Key Takeaways

1. **Default CD** = Check everything, simpler but slower
2. **OnPush** = Check only on input/events, faster but requires immutable patterns
3. **Smart Components** = Default CD, handle logic
4. **Dumb Components** = OnPush CD, receive data
5. **ChangeDetectorRef** = Manual control for edge cases
6. **Async operations** = Use observables or manually mark for check
7. **Performance** = Use OnPush + immutable data patterns
8. **Testing** = Always call `fixture.detectChanges()`

---

## Summary Table

| Topic | Simple Answer | Tricky Point |
|-------|---------------|--------------|
| What is CD? | Mechanism to update DOM | Zone.js intercepts async |
| OnPush vs Default | OnPush is faster | OnPush needs immutable data |
| Smart vs Dumb | Smart has logic, Dumb displays | Dumb should use OnPush |
| ChangeDetectorRef | Manual CD control | Can cause memory leaks |
| Async in OnPush | Won't update automatically | Need markForCheck() |
| Testing | Call detectChanges() | Async tests need fixture.whenStable() |

---

*Generated for Angular Change Detection Course Components*
