import { Component, OnInit, OnDestroy, OnChanges, DoCheck, AfterViewInit, AfterContentInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Directives
import { CourseFreshnessDirective } from './shared/directives/course-freshness.directive';
import { IfAuthenticatedDirective } from './shared/directives/if-authenticated.directive';
import { HighlightRatingDirective } from './shared/directives/highlight-rating.directive';

// Pipes
import { DurationPipe } from './shared/pipes/duration.pipe';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';

// Components
import { HeaderComponent } from './components/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs.component';
import { SearchControlComponent } from './components/search-control.component';
import { CourseItemComponent } from './components/course-item.component';
import { FooterComponent } from './components/footer.component';

// Models
import { Course } from './models/course.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    CourseFreshnessDirective,
    IfAuthenticatedDirective,
    HighlightRatingDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchControlComponent,
    CourseItemComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterViewInit, AfterContentInit {
  title = 'Angular Directives & Pipes Demo';
  isAuthenticated = true;
  searchTerm = '';
  sortBy: 'name' | 'rating' | 'price' = 'name';
  sortAscending = true;
  Math = Math;
  
  allCourses: Course[] = [];
  courses: Course[] = [];
  displayCount = 3;
  nextCourseId = 6;

  constructor() {
    console.log('[CONSTRUCTOR] AppComponent initialized');
  }

  ngOnInit(): void {
    console.log('[ngOnInit] Component initialized');
    this.initializeCourses();
    this.loadMoreCourses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[ngOnChanges] Input properties changed', changes);
  }

  ngDoCheck(): void {
    console.log('[ngDoCheck] Change detection cycle');
  }

  ngAfterContentInit(): void {
    console.log('[ngAfterContentInit] Content projection complete');
  }

  ngAfterViewInit(): void {
    console.log('[ngAfterViewInit] View and child views initialized');
  }

  ngOnDestroy(): void {
    console.log('[ngOnDestroy] Component destroyed');
  }

  initializeCourses(): void {
    console.log('[INIT] Initializing courses...');
    this.allCourses = [
      {
        id: 1,
        name: 'Angular Fundamentals',
        instructor: 'John Doe',
        duration: 240,
        rating: 4.8,
        isNew: true,
        createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        price: 49.99,
        isFeatured: true,
        topRated: true
      },
      {
        id: 2,
        name: 'TypeScript Advanced',
        instructor: 'Jane Smith',
        duration: 180,
        rating: 4.6,
        isNew: true,
        createdDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        price: 59.99,
        isFeatured: false,
        topRated: false
      },
      {
        id: 3,
        name: 'RxJS Mastery',
        instructor: 'Bob Johnson',
        duration: 300,
        rating: 4.9,
        isNew: false,
        createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        price: 69.99,
        isFeatured: true,
        topRated: true
      },
      {
        id: 4,
        name: 'Angular Forms',
        instructor: 'Alice Brown',
        duration: 150,
        rating: 3.8,
        isNew: true,
        createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        price: 39.99,
        isFeatured: false,
        topRated: false
      },
      {
        id: 5,
        name: 'Web Performance',
        instructor: 'Charlie Davis',
        duration: 200,
        rating: 4.4,
        isNew: false,
        createdDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        price: 54.99,
        isFeatured: true,
        topRated: false
      },
      {
        id: 6,
        name: 'Testing in Angular',
        instructor: 'Diana Wilson',
        duration: 220,
        rating: 4.7,
        isNew: false,
        createdDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        price: 59.99,
        isFeatured: false,
        topRated: true
      },
      {
        id: 7,
        name: 'Angular Security',
        instructor: 'Edward Taylor',
        duration: 180,
        rating: 4.5,
        isNew: false,
        createdDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
        price: 64.99,
        isFeatured: true,
        topRated: false
      },
      {
        id: 8,
        name: 'State Management',
        instructor: 'Fiona Anderson',
        duration: 260,
        rating: 4.3,
        isNew: false,
        createdDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        price: 74.99,
        isFeatured: false,
        topRated: false
      }
    ];
  }

  loadMoreCourses(): void {
    console.log('[LOAD MORE] Loading more courses...');
    const endIndex = Math.min(this.displayCount, this.allCourses.length);
    this.courses = this.allCourses.slice(0, endIndex);
    this.displayCount += 3;
  }

  hasMoreCourses(): boolean {
    return this.displayCount <= this.allCourses.length;
  }

  addNewCourse(): void {
    const newCourse: Course = {
      id: this.nextCourseId++,
      name: `New Course ${this.nextCourseId}`,
      instructor: 'New Instructor',
      duration: 120,
      rating: 4.0,
      isNew: true,
      createdDate: new Date(),
      price: 49.99,
      isFeatured: false,
      topRated: false
    };
    this.allCourses.push(newCourse);
    this.courses.push(newCourse);
  }

  onDeleteCourse(courseId: number): void {
    console.log(`[DELETE EVENT] Course ID logged: ${courseId}`);
    this.allCourses = this.allCourses.filter(c => c.id !== courseId);
    this.courses = this.courses.filter(c => c.id !== courseId);
  }

  onEnroll(courseId: number): void {
    console.log(`[ENROLL] Enrolled in course ID: ${courseId}`);
  }

  trackByCourseId(index: number, course: Course): number {
    console.log(`[TRACKBY] Tracking course ID: ${course.id}`);
    return course.id;
  }

  getTopRatedCourses(): Course[] {
    return this.courses.filter(course => course.topRated);
  }

  getNewCourses(): Course[] {
    return this.courses.filter(course => course.isNew);
  }

  onSearch(searchTerm: string): void {
    console.log(`[SEARCH] Searching for: ${searchTerm}`);
    this.searchTerm = searchTerm;
  }

  onClearSearch(): void {
    console.log('[SEARCH] Search cleared');
    this.searchTerm = '';
  }

  toggleAuthentication(): void {
    console.log(`[AUTH] Authentication toggled to: ${!this.isAuthenticated}`);
    this.isAuthenticated = !this.isAuthenticated;
  }
}
