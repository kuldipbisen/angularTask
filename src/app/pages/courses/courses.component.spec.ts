import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesComponent, CourseListComponent, BreadcrumbsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    expect(component.pageTitle).toBe('Courses');
  });

  it('should display page description', () => {
    expect(component.pageDescription).toBe('Browse and manage all available courses');
  });

  it('should render title in template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Courses');
  });
});
