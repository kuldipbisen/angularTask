import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent } from './course-item.component';
import { Course } from '../../models/course.model';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    const mockCourse: Course = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 40,
      rating: 4.5
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.course-title')?.textContent).toContain('Test Course');
  });

  it('should display course rating', () => {
    const mockCourse: Course = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 40,
      rating: 4.8
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.course-rating')?.textContent).toContain('4.8');
  });

  it('should display course duration', () => {
    const mockCourse: Course = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 35,
      rating: 4.5
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.duration')?.textContent).toContain('35 hours');
  });

  it('is a dumb/presentational component that receives input', () => {
    const mockCourse: Course = {
      id: 1,
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 40,
      rating: 4.5
    };

    component.course = mockCourse;
    fixture.detectChanges();

    expect(component.course).toEqual(mockCourse);
  });
});
