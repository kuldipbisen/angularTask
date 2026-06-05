import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddCourseComponent } from './add-course.component';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let courseService: any;
  let authService: any;
  let router: any;

  beforeEach(async () => {
    const courseServiceMock = {
      addCourse: jest.fn().mockReturnValue({
        id: '3',
        title: 'New Course',
        description: 'A new course',
        instructor: 'Test Instructor',
        duration: 30,
        students: 50,
        createdAt: new Date()
      })
    };

    const authServiceMock = {
      getCurrentUser: jest.fn().mockReturnValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      }),
      logout: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AddCourseComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    courseService = TestBed.inject(CourseService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with all fields', () => {
    expect(component.courseForm.get('title')!.value).toBe('');
    expect(component.courseForm.get('description')!.value).toBe('');
    expect(component.courseForm.get('date')!.value).toBe('');
    expect(component.courseForm.get('duration')!.value).toBe('');
    expect(component.courseForm.get('instructor')!.value).toBe('');
    expect(component.courseForm.get('students')!.value).toBe('');
  });

  it('should have required validators on all fields', () => {
    const controls = ['title', 'description', 'date', 'duration', 'instructor', 'students'];
    controls.forEach(controlName => {
      const control = component.courseForm.get(controlName);
      expect(control?.hasError('required')).toBeTruthy();
    });
  });

  it('should validate form submission with valid data', fakeAsync(() => {
    component.courseForm.patchValue({
      title: 'Test Course',
      description: 'This is a test course description',
      date: '2024-01-15',
      duration: 88,
      instructor: 'John Smith',
      students: 100
    });

    component.onSubmit();
    tick(500);

    expect(courseService.addCourse).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  }));

  it('should show error message when form is invalid', () => {
    component.courseForm.patchValue({
      title: '',
      description: '',
      date: '',
      duration: '',
      instructor: '',
      students: ''
    });

    component.onSubmit();

    expect(component.errorMessage).toBe('Please fill in all required fields correctly');
    expect(courseService.addCourse).not.toHaveBeenCalled();
  });

  it('should call logout method on logout button click', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to courses on cancel', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should display current user in header', () => {
    expect(component.currentUser?.firstName).toBe('John');
    expect(component.currentUser?.lastName).toBe('Doe');
  });
});
