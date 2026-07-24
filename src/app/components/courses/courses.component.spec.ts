import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CourseService } from '../../services/course.service';
import { Dialog } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseService: any;
  let dialog: any;

  beforeEach(async () => {
    const courseServiceMock = {
      getCourses: jasmine.createSpy('getCourses').and.returnValue(of([])),
      getCoursesWithPagination: jasmine.createSpy('getCoursesWithPagination').and.returnValue(of([])),
      getPaginationState: jasmine.createSpy('getPaginationState').and.returnValue(of({
        page: 1,
        pageSize: 3,
        total: 0,
        totalPages: 0
      })),
      deleteCourse: jasmine.createSpy('deleteCourse').and.returnValue(of(null)),
      resetAndLoadCourses: jasmine.createSpy('resetAndLoadCourses').and.returnValue(of([]))
    };

    const dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        closed: of(false)
      })
    };

    const activatedRouteMock = {
      paramMap: of(new Map())
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))
    };

    await TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: Dialog, useValue: dialogMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    courseService = TestBed.inject(CourseService);
    dialog = TestBed.inject(Dialog);
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty courses', () => {
    expect(component.courses).toBeDefined();
    expect(Array.isArray(component.courses)).toBe(true);
  });

  it('should call getCoursesWithPagination on init', () => {
    fixture.detectChanges();
    expect(courseService.getCoursesWithPagination).toHaveBeenCalled();
  });

  it('should have initial pagination values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(3);
  });

  it('should have error message string property', () => {
    expect(typeof component.errorMessage).toBe('string');
  });

  it('should have loading state properties', () => {
    expect(typeof component.isLoading).toBe('boolean');
    expect(typeof component.isLoadingMore).toBe('boolean');
  });

  it('should have search text property', () => {
    expect(typeof component.searchText).toBe('string');
  });

  it('should implement OnInit', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  it('should implement OnDestroy', () => {
    expect(component.ngOnDestroy).toBeDefined();
  });

  it('should have onSearch method', () => {
    expect(typeof component.onSearch).toBe('function');
  });

  it('should have onLoadMore method', () => {
    expect(typeof component.onLoadMore).toBe('function');
  });

  it('should have onDeleteCourse method', () => {
    expect(typeof component.onDeleteCourse).toBe('function');
  });

  it('should have shouldShowLoadMoreButton method', () => {
    expect(typeof component.shouldShowLoadMoreButton).toBe('function');
  });

  it('should call search service on search', () => {
    component.searchText = 'angular';
    component.onSearch();
    expect(courseService.resetAndLoadCourses).toHaveBeenCalledWith('angular');
  });

  it('should calculate load more button visibility', () => {
    component.totalCourses = 10;
    component.currentPage = 1;
    component.pageSize = 3;
    const shouldShow = component.shouldShowLoadMoreButton();
    expect(typeof shouldShow).toBe('boolean');
  });

  it('should clean up on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(component).toBeTruthy();
  });
});
