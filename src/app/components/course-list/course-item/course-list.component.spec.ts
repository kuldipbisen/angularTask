import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course list', () => {
    expect(component.courses.length).toBe(3);
  });

  it('should render courses in template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Angular Basics');
    expect(compiled.textContent).toContain('Component Communication');
  });
});
