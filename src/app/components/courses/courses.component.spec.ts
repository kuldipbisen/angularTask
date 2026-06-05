import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { CourseService, Course } from '../../services/course.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { of, BehaviorSubject } from 'rxjs';

describe('CoursesComponent - Delete with Confirmation', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseService: any;
  let dialog: any;

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Angular Fundamentals',
      description: 'Learn Angular basics',
      instructor: 'John Doe',
      duration: 40,
      students: 150,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'TypeScript Advanced',
      description: 'Master TypeScript',
      instructor: 'Jane Smith',
      duration: 35,
      students: 120,
      createdAt: new Date()
    }
  ];

  beforeEach(async () => {
    const courseServiceMock = {
      getCourses: jest.fn().mockReturnValue(of(mockCourses)),
      getCourseById: jest.fn(),
      addCourse: jest.fn(),
      updateCourse: jest.fn(),
      deleteCourse: jest.fn(),
      searchCourses: jest.fn()
    };

    const dialogMock = {
      open: jest.fn().mockReturnValue({
        closed: of(true)
      })
    };

    await TestBed.configureTestingModule({
      imports: [CoursesComponent, CourseItemComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: Dialog, useValue: dialogMock }
      ]
    }).compileComponents();

    courseService = TestBed.inject(CourseService);
    dialog = TestBed.inject(Dialog);

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadCourses', () => {
    it('should load courses on init', () => {
      fixture.detectChanges();

      expect(courseService.getCourses).toHaveBeenCalled();
      expect(component.courses).toEqual(mockCourses);
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Delete with Confirmation Dialog', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open confirmation dialog when delete is clicked', () => {
      const course = mockCourses[0];

      component.onDeleteCourse(course);

      expect(dialog.open).toHaveBeenCalled();
    });

    it('should pass correct data to confirmation dialog', () => {
      const course = mockCourses[0];

      component.onDeleteCourse(course);

      const callArgs = dialog.open.mock.calls[0];
      const data = callArgs[1].data;

      expect(data.title).toBe('Delete Course');
      expect(data.message).toContain(course.title);
      expect(data.confirmText).toBe('Delete');
      expect(data.cancelText).toBe('Cancel');
    });

    it('should delete course when user confirms', (done) => {
      const course = mockCourses[0];
      courseService.deleteCourse.mockReturnValue(true);
      dialog.open.mockReturnValue({
        closed: of(true)
      });

      component.onDeleteCourse(course);

      setTimeout(() => {
        expect(courseService.deleteCourse).toHaveBeenCalledWith(course.id);
        done();
      }, 100);
    });

    it('should not delete course when user cancels', (done) => {
      const course = mockCourses[0];
      dialog.open.mockReturnValue({
        closed: of(false)
      });

      component.onDeleteCourse(course);

      setTimeout(() => {
        expect(courseService.deleteCourse).not.toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should handle delete confirmation with proper message', () => {
      const courseToDelete = mockCourses[1];

      component.onDeleteCourse(courseToDelete);

      const callArgs = dialog.open.mock.calls[0];
      const data = callArgs[1].data;

      expect(data.message).toContain('TypeScript Advanced');
      expect(data.message).toContain('cannot be undone');
    });
  });

  describe('Display Logic', () => {
    it('should display all courses', () => {
      component.courses = mockCourses;
      fixture.detectChanges();

      expect(component.courses.length).toBe(2);
    });

    it('should display empty state when no courses', () => {
      component.courses = [];
      component.isLoading = false;

      expect(component.courses.length).toBe(0);
    });

    it('should pass course data to course-item component', () => {
      component.courses = mockCourses;
      fixture.detectChanges();

      const courseItems = fixture.debugElement.queryAll(
        el => el.name === 'app-course-item'
      );

      expect(courseItems.length).toBe(mockCourses.length);
    });

    it('should emit delete event from course-item component', () => {
      component.courses = mockCourses;
      const deleteSpyDialog = jest.spyOn(component, 'onDeleteCourse');

      fixture.detectChanges();

      const courseItems = fixture.debugElement.queryAll(
        el => el.name === 'app-course-item'
      );

      if (courseItems.length > 0) {
        const firstCourseItem = courseItems[0].componentInstance as CourseItemComponent;
        firstCourseItem.delete.emit(mockCourses[0]);
      }

      expect(deleteSpyDialog).toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('should unsubscribe on destroy', () => {
      const nextSpy = jest.spyOn(component['destroy$'], 'next');
      const completeSpy = jest.spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
      
      nextSpy.mockRestore();
      completeSpy.mockRestore();
    });
  });
});
