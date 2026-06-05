import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent } from './course-item.component';
import { Course } from '../../services/course.service';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  const mockCourse: Course = {
    id: '1',
    title: 'Angular Fundamentals',
    description: 'Learn Angular basics',
    instructor: 'John Doe',
    duration: 40,
    students: 150,
    createdAt: new Date('2024-01-15')
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
    const titleElement = fixture.debugElement.query(By.css('h3'));
    expect(titleElement.nativeElement.textContent).toContain('Angular Fundamentals');
  });

  it('should display course description', () => {
    const descriptionElement = fixture.debugElement.query(By.css('.description'));
    expect(descriptionElement.nativeElement.textContent).toContain('Learn Angular basics');
  });

  it('should display course duration', () => {
    const elementText = fixture.nativeElement.textContent;
    expect(elementText).toContain('40 hours');
  });

  it('is a dumb/presentational component that receives input', () => {
    expect(component.course).toEqual(mockCourse);
  });

  it('should emit delete event when delete button is clicked', (done) => {
    component.delete.subscribe((course: Course) => {
      expect(course).toEqual(mockCourse);
      done();
    });

    const deleteButton = fixture.debugElement.query(By.css('.btn-secondary'));
    deleteButton.nativeElement.click();
  });

  it('should use OnPush change detection strategy', () => {
    // Verify that the component uses OnPush strategy
    const metadata = (component.constructor as any).ɵcmp;
    if (metadata) {
      expect(metadata.changeDetection).toBe(ChangeDetectionStrategy.OnPush);
    }
  });

  it('should update display when course input changes', () => {
    const newCourse: Course = {
      id: '2',
      title: 'TypeScript Advanced',
      description: 'Master TypeScript',
      instructor: 'Jane Smith',
      duration: 35,
      students: 120,
      createdAt: new Date('2024-02-20')
    };

    component.course = newCourse;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h3'));
    expect(titleElement.nativeElement.textContent).toContain('TypeScript Advanced');
  });

  it('should display all course details', () => {
    const detailsText = fixture.nativeElement.textContent;
    expect(detailsText).toContain('John Doe'); // instructor
    expect(detailsText).toContain('40 hours'); // duration
    expect(detailsText).toContain('150'); // students
  });

  it('should emit course object when delete is clicked', () => {
    const emitSpy = jest.spyOn(component.delete, 'emit');

    component.onDelete();

    expect(emitSpy).toHaveBeenCalledWith(mockCourse);
  });
});
