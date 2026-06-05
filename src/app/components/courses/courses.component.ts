import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';
import { AuthService, User } from '../../services/auth.service';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseItemComponent, RouterLink, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery = '';
  isLoading = false;
  errorMessage = '';
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private dialog: Dialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          this.filteredCourses = courses;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load courses';
          this.isLoading = false;
        }
      });
  }

  searchCourses(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCourses = this.courses;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
      );
    }
  }

  onDeleteCourse(course: Course): void {
    const dialogRef = this.dialog.open<boolean>(
      ConfirmDialogComponent,
      {
        width: '400px',
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

  private deleteCourse(courseId: string): void {
    const deleted = this.courseService.deleteCourse(courseId);
    if (deleted) {
      // Course will be removed from the list automatically through the observable
      console.log('Course deleted successfully');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
