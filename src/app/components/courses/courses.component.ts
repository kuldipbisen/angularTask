import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  filteredCourses: Course[] = [];
  isLoading = false;
  errorMessage = '';
  searchText = '';
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
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

  onSearch(): void {
    if (!this.searchText.trim()) {
      this.filteredCourses = this.courses;
    } else {
      const searchLower = this.searchText.toLowerCase();
      this.filteredCourses = this.courses.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
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
      this.loadCourses();
      console.log('Course deleted successfully');
    }
  }
}
