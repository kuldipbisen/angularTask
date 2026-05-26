import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item/course-item.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesListComponent, CourseItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    expect(component.courses.length).toBeGreaterThan(0);
  });

  it('should have 4 courses loaded', () => {
    expect(component.courses.length).toBe(4);
  });

  it('should display courses header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.courses-header h1')?.textContent).toContain('Available Courses');
  });

  it('should display course count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.courses-count')?.textContent).toContain('4 courses available');
  });

  it('should render course items for each course', () => {
    fixture.detectChanges();
    const courseItems = fixture.nativeElement.querySelectorAll('app-course-item');
    expect(courseItems.length).toBe(4);
  });

  it('should pass course data to course-item component', () => {
    fixture.detectChanges();
    const firstCourseItem = fixture.debugElement.children[0].children[1].children[0];
    expect(firstCourseItem.componentInstance.course).toEqual(component.courses[0]);
  });
});
