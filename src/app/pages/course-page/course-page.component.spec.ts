import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursePageComponent } from './course-page.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CourseItemComponent } from '../../components/course-item/course-item.component';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePageComponent, CoursesListComponent, CourseItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render courses-list component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-courses-list')).toBeTruthy();
  });

  it('should display courses when component loads', () => {
    const coursesList = fixture.debugElement.children[0].componentInstance;
    expect(coursesList.courses.length).toBeGreaterThan(0);
  });
});
