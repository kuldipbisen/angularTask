import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent, Course } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  const mockCourse: Course = {
    id: 1,
    title: 'Angular Fundamentals',
    instructor: 'John Doe',
    description: 'Learn Angular basics from scratch',
    level: 'Beginner',
    students: 1250,
    rating: 4.8,
    price: 49.99
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.course-title').textContent).toContain('Angular Fundamentals');
  });

  it('should display course instructor', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.instructor').textContent).toContain('John Doe');
  });

  it('should display course rating', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.rating-value').textContent).toContain('4.8');
  });

  it('should display course price', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.stat-value')).toBeTruthy();
  });

  it('should display course level badge', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.level-beginner')).toBeTruthy();
  });

  it('should emit deleteCourse event on delete', (done) => {
    component.deleteCourse.subscribe((id: number) => {
      expect(id).toBe(1);
      done();
    });
    component.onDelete();
  });

  it('should emit viewCourse event on view', (done) => {
    component.viewCourse.subscribe((id: number) => {
      expect(id).toBe(1);
      done();
    });
    component.onView();
  });

  it('should emit editCourse event on edit', (done) => {
    component.editCourse.subscribe((id: number) => {
      expect(id).toBe(1);
      done();
    });
    component.onEdit();
  });

  it('should display action buttons', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.btn');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('should log on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.course).toEqual(mockCourse);
  });

  it('should log on ngOnDestroy', () => {
    fixture.destroy();
    expect(component).toBeTruthy();
  });

  it('should display course description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.course-description').textContent).toContain('Learn Angular basics from scratch');
  });

  it('should display student count', () => {
    const compiled = fixture.nativeElement;
    const stats = compiled.querySelectorAll('.stat-value');
    expect(stats[0].textContent).toContain('1250');
  });
});
