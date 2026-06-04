import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent, Course } from './course-item/course-item.component';
import { SearchComponent } from './search/search.component';

/**
 * COURSE LIST COMPONENT
 * 
 * Main component for displaying and managing courses
 * Demonstrates lifecycle hooks: constructor, ngOnChanges, ngOnInit, ngOnDestroy
 */
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseItemComponent, SearchComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy, OnChanges {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  componentId = Math.random();

  constructor() {
    console.log(`[CourseList ${this.componentId}] Constructor called - component created`, {
      coursesLength: this.courses.length,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`[CourseList ${this.componentId}] ngOnChanges called`, {
      changes: changes,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnInit(): void {
    console.log(`[CourseList ${this.componentId}] ngOnInit called - component initialized`, {
      timestamp: new Date().toLocaleTimeString()
    });
    
    // Initialize courses array inside ngOnInit hook
    this.courses = [
      {
        id: 1,
        title: 'Angular Basics',
        duration: '4 hours',
        date: '2024-06-04',
        description: 'Learn the fundamentals of Angular, including components, services, and dependency injection.'
      },
      {
        id: 2,
        title: 'Component Communication',
        duration: '3 hours',
        date: '2024-06-05',
        description: 'Master component interaction patterns using @Input, @Output, and EventEmitters.'
      },
      {
        id: 3,
        title: 'Lifecycle Hooks',
        duration: '2.5 hours',
        date: '2024-06-06',
        description: 'Understand Angular lifecycle hooks and how to use them effectively in your applications.'
      },
      {
        id: 4,
        title: 'Template Reference Variables',
        duration: '2 hours',
        date: '2024-06-07',
        description: 'Learn how to use template reference variables to interact with DOM elements.'
      },
      {
        id: 5,
        title: 'Custom Events',
        duration: '3.5 hours',
        date: '2024-06-08',
        description: 'Create and emit custom events to communicate between components effectively.'
      }
    ];
    this.filteredCourses = [...this.courses];
    
    console.log(`[CourseList ${this.componentId}] Courses initialized with ${this.courses.length} items`);
  }

  ngOnDestroy(): void {
    console.log(`[CourseList ${this.componentId}] ngOnDestroy called - component destroyed`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  /**
   * TrackBy function for ngFor optimization
   * Helps Angular identify which items have changed, been added, or removed
   * Improves performance when dealing with large lists
   */
  trackByCourseId(index: number, course: Course): number {
    console.log(`[CourseList ${this.componentId}] trackByCourseId called for index ${index}, courseId ${course.id}`);
    return course.id;
  }

  onEditClick(course: Course): void {
    console.log(`[CourseList ${this.componentId}] Edit clicked for course:`, course.id, course.title);
  }

  onDeleteClick(courseId: number): void {
    console.log(`[CourseList ${this.componentId}] Delete clicked for course:`, courseId);
    this.courses = this.courses.filter(c => c.id !== courseId);
    this.filteredCourses = this.filteredCourses.filter(c => c.id !== courseId);
  }

  onLoadMore(): void {
    console.log(`[CourseList ${this.componentId}] Load more clicked`);
  }

  onSearch(searchValue: string): void {
    console.log(`[CourseList ${this.componentId}] Search value:`, searchValue);
    if (!searchValue.trim()) {
      this.filteredCourses = [...this.courses];
    } else {
      const lowerSearchValue = searchValue.toLowerCase();
      this.filteredCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(lowerSearchValue) ||
        course.description.toLowerCase().includes(lowerSearchValue)
      );
    }
    console.log(`[CourseList ${this.componentId}] Filtered courses count:`, this.filteredCourses.length);
  }

  onAddCourse(): void {
    console.log(`[CourseList ${this.componentId}] Add course clicked`);
  }
}
