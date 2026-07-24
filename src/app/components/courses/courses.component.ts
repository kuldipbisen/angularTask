import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  isLoading = false;
  isLoadingMore = false;
  errorMessage = '';
  searchText = '';
  showLoadMoreButton = false;
  
  // Pagination state
  currentPage = 1;
  pageSize = 3;
  totalCourses = 0;
  totalPages = 0;

  private destroy$ = new Subject<void>();
  private currentSearch = '';

  constructor(
    private courseService: CourseService,
    private dialog: Dialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load initial courses
    this.loadInitialCourses();
    
    // Also subscribe to route events to refresh when navigating back
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadInitialCourses();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load first page of courses
   */
  private loadInitialCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.currentPage = 1;
    this.currentSearch = '';
    this.searchText = '';

    this.courseService.getCoursesWithPagination(1, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          this.updatePaginationState();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load courses';
          console.error(error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Handle search button click
   * Makes server-side request using /search endpoint
   */
  onSearch(): void {
    if (!this.searchText.trim()) {
      // If search is empty, reload all courses
      console.log('Search text is empty, loading all courses');
      this.loadInitialCourses();
      return;
    }

    console.log('Search triggered with text:', this.searchText);
    this.currentSearch = this.searchText;
    this.isLoading = true;
    this.errorMessage = '';
    this.currentPage = 1;
    this.courses = [];

    // Call dedicated search endpoint
    this.courseService.searchCourses(this.searchText)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          console.log('Search results received:', courses.length, 'courses');
          this.courses = courses;
          this.updatePaginationState();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.errorMessage = 'Search failed. Please try again.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Load next page of courses
   * Appends to existing courses list
   */
  onLoadMore(): void {
    this.isLoadingMore = true;
    this.errorMessage = '';

    this.courseService.loadMoreCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newCourses) => {
          this.courses = [...this.courses, ...newCourses];
          this.updatePaginationState();
          this.isLoadingMore = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load more courses';
          console.error(error);
          this.isLoadingMore = false;
        }
      });
  }

  /**
   * Check if load more button should be displayed
   */
  shouldShowLoadMoreButton(): boolean {
    if (this.totalCourses === 0) {
      return false;
    }

    const remainingItems = this.totalCourses - (this.currentPage * this.pageSize);
    return remainingItems > 0;
  }

  /**
   * Delete course with confirmation dialog
   */
  onDeleteCourse(course: Course): void {
    const dialogRef = this.dialog.open<boolean>(
      ConfirmDialogComponent,
      {
        width: 'auto',
        maxWidth: '600px',
        hasBackdrop: true,
        backdropClass: 'confirm-dialog-backdrop',
        panelClass: 'confirm-dialog-panel',
        data: {
          title: 'Delete Course',
          message: `Are you sure you want to delete the course "${course.title}"? This action cannot be undone.`,
          confirmText: 'Delete',
          cancelText: 'Cancel'
        } as ConfirmDialogData
      }
    );

    dialogRef.closed.subscribe(result => {
      if (result === true) {
        this.deleteCourse(course.id);
      }
    });
  }

  /**
   * Delete course from backend
   */
  private deleteCourse(courseId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.deleteCourse(courseId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Reload courses after successful deletion
          this.loadInitialCourses();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete course. Please try again.';
          console.error('Delete failed:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Update pagination state from service
   * Called after each data load
   */
  private updatePaginationState(): void {
    this.courseService.getPaginationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.currentPage = state.page;
        this.pageSize = state.pageSize;
        this.totalCourses = state.total;
        this.totalPages = state.totalPages;
        this.showLoadMoreButton = this.shouldShowLoadMoreButton();
      });
  }
}
