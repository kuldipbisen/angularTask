import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CourseFreshnessDirective } from './directives/course-freshness.directive';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { HighlightRatingDirective } from './directives/highlight-rating.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        FormsModule,
        CourseFreshnessDirective,
        IfAuthenticatedDirective,
        HighlightRatingDirective,
        DurationPipe,
        OrderByPipe,
        FilterPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with title', () => {
    component.ngOnInit();
    expect(component.title).toBe('Angular Directives & Pipes Demo');
  });

  it('should have default authentication state as true', () => {
    expect(component.isAuthenticated).toBe(true);
  });

  it('should initialize with empty search term', () => {
    expect(component.searchTerm).toBe('');
  });

  it('should initialize with sort by name', () => {
    expect(component.sortBy).toBe('name');
  });

  it('should initialize with ascending sort order', () => {
    expect(component.sortAscending).toBe(true);
  });

  it('should initialize courses data', () => {
    component.initializeCourses();
    expect(component.allCourses.length).toBeGreaterThan(0);
  });

  it('should load courses on initialization', () => {
    component.ngOnInit();
    expect(component.courses.length).toBeGreaterThan(0);
  });

  it('should toggle authentication state', () => {
    const initialState = component.isAuthenticated;
    component.toggleAuthentication();
    expect(component.isAuthenticated).toBe(!initialState);

    component.toggleAuthentication();
    expect(component.isAuthenticated).toBe(initialState);
  });

  it('should return top rated courses', () => {
    component.initializeCourses();
    component.loadMoreCourses();
    const topRated = component.getTopRatedCourses();
    expect(topRated.length).toBeGreaterThan(0);
    topRated.forEach(course => {
      expect(course.rating).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('should return new courses', () => {
    component.initializeCourses();
    component.loadMoreCourses();
    const newCourses = component.getNewCourses();
    expect(newCourses.length).toBeGreaterThan(0);
    newCourses.forEach(course => {
      expect(course.isNew).toBe(true);
    });
  });

  it('should have trackBy function', () => {
    component.initializeCourses();
    component.loadMoreCourses();
    if (component.courses.length > 0) {
      const trackId = component.trackByCourseId(0, component.courses[0]);
      expect(trackId).toBe(component.courses[0].id);
    }
  });

  it('should add new course', () => {
    component.ngOnInit();
    const initialLength = component.allCourses.length;
    component.addNewCourse();
    expect(component.allCourses.length).toBe(initialLength + 1);
  });

  it('should delete course', () => {
    component.ngOnInit();
    if (component.courses.length > 0) {
      const courseId = component.courses[0].id;
      const initialLength = component.courses.length;
      component.onDeleteCourse(courseId);
      expect(component.courses.length).toBe(initialLength - 1);
    }
  });

  it('should log delete event', () => {
    spyOn(console, 'log');
    component.onDeleteCourse(1);
    expect(console.log).toHaveBeenCalledWith('[DELETE EVENT] Course ID logged: 1');
  });

  it('should have lifecycle hooks called', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

  it('should update search term on search', () => {
    const searchQuery = 'Angular';
    component.onSearch(searchQuery);
    expect(component.searchTerm).toBe(searchQuery);
  });

  it('should clear search', () => {
    component.searchTerm = 'test';
    component.onClearSearch();
    expect(component.searchTerm).toBe('');
  });

  it('should load more courses', () => {
    component.ngOnInit();
    const initialCount = component.courses.length;
    if (component.hasMoreCourses()) {
      component.loadMoreCourses();
      expect(component.courses.length).toBeGreaterThanOrEqual(initialCount);
    }
  });

  it('should check if has more courses', () => {
    component.ngOnInit();
    const hasMore = component.hasMoreCourses();
    expect(typeof hasMore).toBe('boolean');
  });

  it('should have courses with required properties', () => {
    component.initializeCourses();
    component.courses.forEach(course => {
      expect(course.id).toBeDefined();
      expect(course.name).toBeDefined();
      expect(course.instructor).toBeDefined();
      expect(course.duration).toBeDefined();
      expect(course.rating).toBeDefined();
      expect(course.isNew).toBeDefined();
      expect(course.createdDate).toBeDefined();
      expect(course.price).toBeDefined();
      expect(course.isFeatured).toBeDefined();
    });
  });

  it('should have proper course ratings', () => {
    component.initializeCourses();
    component.allCourses.forEach(course => {
      expect(course.rating).toBeGreaterThanOrEqual(0);
      expect(course.rating).toBeLessThanOrEqual(5);
    });
  });

  it('should have proper course prices', () => {
    component.initializeCourses();
    component.allCourses.forEach(course => {
      expect(course.price).toBeGreaterThan(0);
    });
  });

  it('should have proper course durations', () => {
    component.initializeCourses();
    component.allCourses.forEach(course => {
      expect(course.duration).toBeGreaterThan(0);
    });
  });

  it('should have unique course IDs', () => {
    component.initializeCourses();
    const ids = component.allCourses.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have Math object accessible', () => {
    expect(component.Math).toBe(Math);
  });

  it('should render the template without errors', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should have header component', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should have footer component', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should have search control component', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const searchControl = fixture.nativeElement.querySelector('app-search-control');
    expect(searchControl).toBeTruthy();
  });

  it('should have courses grid', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('.courses-grid');
    expect(grid).toBeTruthy();
  });
});
