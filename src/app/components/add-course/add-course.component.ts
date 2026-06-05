import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService, User } from '../../services/auth.service';
import { MinutesToDurationPipe } from '../../pipes/minutes-to-duration.pipe';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MinutesToDurationPipe
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  currentUser: User | null = null;
  authors: string[] = [];
  authorInput = '';

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.initializeForm();
  }

  initializeForm(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(500)]]
    });
  }

  get title() {
    return this.courseForm.get('title');
  }

  get titleControl(): FormControl {
    return this.courseForm.get('title') as FormControl;
  }

  get description() {
    return this.courseForm.get('description');
  }

  get descriptionControl(): FormControl {
    return this.courseForm.get('description') as FormControl;
  }

  get date() {
    return this.courseForm.get('date');
  }

  get dateControl(): FormControl {
    return this.courseForm.get('date') as FormControl;
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get durationControl(): FormControl {
    return this.courseForm.get('duration') as FormControl;
  }

  addAuthor(): void {
    if (this.authorInput.trim() && !this.authors.includes(this.authorInput.trim())) {
      this.authors.push(this.authorInput.trim());
      this.authorInput = '';
    }
  }

  removeAuthor(author: string): void {
    this.authors = this.authors.filter(a => a !== author);
  }

  onSubmit(): void {
    if (this.courseForm.invalid || this.authors.length === 0) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      try {
        const newCourse = this.courseService.addCourse({
          title: this.courseForm.get('title')!.value,
          description: this.courseForm.get('description')!.value,
          instructor: this.authors.join(', '),
          duration: parseInt(this.courseForm.get('duration')!.value),
          students: 0
        });

        this.isLoading = false;
        this.router.navigate(['/courses']);
      } catch (error) {
        this.errorMessage = 'Failed to add course. Please try again.';
        this.isLoading = false;
      }
    }, 500);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
