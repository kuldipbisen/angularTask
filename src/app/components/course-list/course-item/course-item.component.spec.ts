import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent, Course } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 1,
      title: 'Angular Basics',
      duration: '4 hours',
      date: '2024-06-04',
      description: 'Learn Angular fundamentals'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    expect(component.course.title).toBe('Angular Basics');
  });

  it('should emit editItemEvent', (done) => {
    component.editItemEvent.subscribe((course: Course) => {
      expect(course.id).toBe(1);
      done();
    });
    component.handleEditClick(component.course);
  });

  it('should emit deleteItemEvent', (done) => {
    component.deleteItemEvent.subscribe((id: number) => {
      expect(id).toBe(1);
      done();
    });
    component.handleDeleteClick(1);
  });
});
