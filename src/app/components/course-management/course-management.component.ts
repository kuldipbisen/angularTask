import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { SearchControlComponent } from './search-control.component';
import { CourseItemComponent, Course } from './course-item.component';
import { FooterComponent } from './footer.component';

/**
 * COURSE MANAGEMENT COMPONENT
 * 
 * Main container component for course management
 * Implements:
 * - Header, Breadcrumbs, Search, Footer
 * - Add new course button
 * - Course items with Delete event logging
 * - Load more button for pagination
 * - Lifecycle hooks with console logging
 * - Courses initialization
 * - TrackBy function for ngFor optimization
 */
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BreadcrumbsComponent,
    SearchControlComponent,
    CourseItemComponent,
    FooterComponent
  ],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  displayedCourses: Course[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  searchQuery: string = '';

  private allCourses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      instructor: 'John Doe',
      description: 'Learn Angular basics from scratch with hands-on projects',
      level: 'Beginner',
      students: 1250,
      rating: 4.8,
      price: 49.99
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      instructor: 'Jane Smith',
      description: 'Master advanced TypeScript concepts for production code',
      level: 'Advanced',
      students: 850,
      rating: 4.9,
      price: 79.99
    },
    {
      id: 3,
      title: 'RxJS Deep Dive',
      instructor: 'Mike Johnson',
      description: 'Understand reactive programming with RxJS',
      level: 'Intermediate',
      students: 650,
      rating: 4.7,
      price: 59.99
    },
    {
      id: 4,
      title: 'Web Components',
      instructor: 'Sarah Williams',
      description: 'Build reusable web components for any framework',
      level: 'Intermediate',
      students: 520,
      rating: 4.6,
      price: 54.99
    },
    {
      id: 5,
      title: 'Testing in Angular',
      instructor: 'David Brown',
      description: 'Write comprehensive unit and integration tests',
      level: 'Advanced',
      students: 780,
      rating: 4.8,
      price: 64.99
    },
    {
      id: 6,
      title: 'Angular Performance',
      instructor: 'Emily Davis',
      description: 'Optimize Angular applications for speed and efficiency',
      level: 'Advanced',
      students: 450,
      rating: 4.9,
      price: 69.99
    },
    {
      id: 7,
      title: 'CSS Grid & Flexbox',
      instructor: 'Robert Taylor',
      description: 'Master modern CSS layout techniques',
      level: 'Beginner',
      students: 2100,
      rating: 4.7,
      price: 39.99
    },
    {
      id: 8,
      title: 'JavaScript ES6+',
      instructor: 'Lisa Anderson',
      description: 'Modern JavaScript features and best practices',
      level: 'Beginner',
      students: 1800,
      rating: 4.8,
      price: 44.99
    },
    {
      id: 9,
      title: 'Node.js Backend',
      instructor: 'James Martinez',
      description: 'Build scalable backend applications with Node.js',
      level: 'Intermediate',
      students: 950,
      rating: 4.7,
      price: 59.99
    },
    {
      id: 10,
      title: 'RESTful API Design',
      instructor: 'Patricia Garcia',
      description: 'Design and implement robust REST APIs',
      level: 'Intermediate',
      students: 720,
      rating: 4.8,
      price: 54.99
    },
    {
      id: 11,
      title: 'Database Design',
      instructor: 'Christopher Lee',
      description: 'SQL and NoSQL database design patterns',
      level: 'Advanced',
      students: 580,
      rating: 4.9,
      price: 74.99
    },
    {
      id: 12,
      title: 'DevOps Essentials',
      instructor: 'Nancy White',
      description: 'Learn CI/CD, Docker, and deployment strategies',
      level: 'Advanced',
      students: 420,
      rating: 4.8,
      price: 89.99
    }
  ];

  constructor() {
    console.log('[CourseManagement] Constructor called');
  }

  ngOnInit(): void {
    console.log('[CourseManagement] ngOnInit called - Component initialized');
    this.initializeCourses();
    this.applyFilters();
    this.loadMore();
  }

  /**
   * Initialize courses from mock data
   */
  private initializeCourses(): void {
    console.log('[CourseManagement] Courses initialized with', this.allCourses.length, 'items');
    this.courses = [...this.allCourses];
  }

  /**
   * Apply search filter to courses
   */
  onSearchChange(query: string): void {
    console.log('[CourseManagement] Search filter applied:', query);
    this.searchQuery = query;
    this.currentPage = 1;
    this.applyFilters();
    this.loadMore();
  }

  /**
   * Apply filters to courses based on search query
   */
  private applyFilters(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCourses = [...this.courses];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCourses = this.courses.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }
    console.log('[CourseManagement] Filters applied. Results:', this.filteredCourses.length);
  }

  /**
   * Load more courses for pagination
   */
  loadMore(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedCourses = this.filteredCourses.slice(0, end);
    console.log('[CourseManagement] Loaded', this.displayedCourses.length, 'courses (Page', this.currentPage + ')');
  }

  /**
   * Check if more courses are available to load
   */
  hasMoreCourses(): boolean {
    return this.displayedCourses.length < this.filteredCourses.length;
  }

  /**
   * Load next batch of courses
   */
  onLoadMore(): void {
    this.currentPage++;
    console.log('[CourseManagement] Load more clicked. Moving to page', this.currentPage);
    this.loadMore();
  }

  /**
   * Add new course
   */
  addNewCourse(): void {
    console.log('[CourseManagement] Add new course button clicked');
    alert('Add new course functionality would open a form');
  }

  /**
   * Handle course deletion
   */
  onDeleteCourse(courseId: number): void {
    console.log('[CourseManagement] Delete event received for Course ID:', courseId);
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      console.log('[CourseManagement] Deleting course:', course.title, '(ID:', courseId + ')');
      this.courses = this.courses.filter(c => c.id !== courseId);
      this.applyFilters();
      this.displayedCourses = this.displayedCourses.filter(c => c.id !== courseId);
      console.log('[CourseManagement] Course deleted successfully. Total courses:', this.courses.length);
    }
  }

  /**
   * Handle course view
   */
  onViewCourse(courseId: number): void {
    console.log('[CourseManagement] View course with ID:', courseId);
  }

  /**
   * Handle course edit
   */
  onEditCourse(courseId: number): void {
    console.log('[CourseManagement] Edit course with ID:', courseId);
  }

  /**
   * TrackBy function for ngFor optimization
   * Used to help Angular track which items have been added, removed, or reordered
   */
  trackByCourseId(index: number, course: Course): number {
    console.log('[CourseManagement] TrackBy called for course ID:', course.id);
    return course.id;
  }

  ngOnDestroy(): void {
    console.log('[CourseManagement] ngOnDestroy called - Component destroyed');
  }
}
