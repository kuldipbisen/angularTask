import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BreadcrumbsComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  courseId: string | null = null;
  isNewCourse = true;
  currentCourse: Course | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.courseId = params.get('id');
        if (this.courseId) {
          this.isNewCourse = false;
          this.loadCourse(this.courseId);
        } else {
          this.isNewCourse = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      instructor: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(1)]],
      students: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadCourse(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    const course = this.courseService.getCourseById(id);
    if (course) {
      this.currentCourse = course;
      this.courseForm.patchValue({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        duration: course.duration,
        students: course.students
      });
      this.isLoading = false;
    } else {
      this.errorMessage = 'Course not found';
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigate(['/courses']);
      }, 2000);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.courseForm.value;

    if (this.isNewCourse) {
      const newCourse = this.courseService.addCourse({
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        duration: formData.duration,
        students: formData.students
      });
      this.isLoading = false;
      this.successMessage = 'Course created successfully!';
      setTimeout(() => {
        this.router.navigate(['/courses', newCourse.id]);
      }, 1500);
    } else if (this.courseId) {
      const updated = this.courseService.updateCourse(this.courseId, formData);
      if (updated) {
        this.isLoading = false;
        this.successMessage = 'Course updated successfully!';
        this.currentCourse = updated;
        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 1500);
      } else {
        this.isLoading = false;
        this.errorMessage = 'Failed to update course';
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get instructor() {
    return this.courseForm.get('instructor');
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get students() {
    return this.courseForm.get('students');
  }
}
