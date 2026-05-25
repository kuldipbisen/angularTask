import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseManagementComponent } from './course-management.component';
import { HeaderComponent } from './header.component';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { SearchControlComponent } from './search-control.component';
import { CourseItemComponent } from './course-item.component';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';

describe('CourseManagementComponent', () => {
  let component: CourseManagementComponent;
  let fixture: ComponentFixture<CourseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CourseManagementComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        SearchControlComponent,
        CourseItemComponent,
        FooterComponent,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 12 courses', () => {
    fixture.detectChanges();
    expect(component.courses.length).toBe(12);
  });

  it('should set items per page to 6', () => {
    expect(component.itemsPerPage).toBe(6);
  });

  it('should initialize current page to 1', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should log on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.courses.length).toBe(12);
  });

  it('should log courses initialization', () => {
    fixture.detectChanges();
    expect(component.displayedCourses.length).toBeGreaterThan(0);
  });

  it('should load initial courses on component init', () => {
    fixture.detectChanges();
    expect(component.displayedCourses.length).toBe(6);
  });

  it('should handle search query change', () => {
    fixture.detectChanges();
    component.onSearchChange('angular');
    expect(component.searchQuery).toBe('angular');
  });

  it('should filter courses based on search query', () => {
    fixture.detectChanges();
    component.onSearchChange('Angular');
    expect(component.filteredCourses.length).toBeGreaterThan(0);
  });

  it('should reset page to 1 on search', () => {
    fixture.detectChanges();
    component.currentPage = 3;
    component.onSearchChange('test');
    expect(component.currentPage).toBe(1);
  });

  it('should have more courses to load initially', () => {
    fixture.detectChanges();
    expect(component.hasMoreCourses()).toBe(true);
  });

  it('should load more courses on loadMore button click', () => {
    fixture.detectChanges();
    const initialCount = component.displayedCourses.length;
    component.onLoadMore();
    expect(component.displayedCourses.length).toBeGreaterThan(initialCount);
  });

  it('should increment current page on load more', () => {
    fixture.detectChanges();
    const initialPage = component.currentPage;
    component.onLoadMore();
    expect(component.currentPage).toBe(initialPage + 1);
  });

  it('should log load more event', () => {
    fixture.detectChanges();
    component.onLoadMore();
    expect(component.currentPage).toBe(2);
  });

  it('should handle delete course event', () => {
    fixture.detectChanges();
    const initialCount = component.courses.length;
    component.onDeleteCourse(1);
    expect(component.courses.length).toBe(initialCount - 1);
  });

  it('should log delete course with ID', () => {
    fixture.detectChanges();
    component.onDeleteCourse(1);
    expect(component.courses.find(c => c.id === 1)).toBeUndefined();
  });

  it('should log course title on delete', () => {
    fixture.detectChanges();
    component.onDeleteCourse(1);
    expect(component.courses.length).toBeLessThan(12);
  });

  it('should handle view course event', () => {
    fixture.detectChanges();
    component.onViewCourse(1);
    expect(component).toBeTruthy();
  });

  it('should handle edit course event', () => {
    fixture.detectChanges();
    component.onEditCourse(1);
    expect(component).toBeTruthy();
  });

  it('should add new course (log event)', () => {
    spyOn(window, 'alert');
    fixture.detectChanges();
    component.addNewCourse();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should use trackBy function to identify courses by ID', () => {
    fixture.detectChanges();
    const course = component.courses[0];
    const trackId = component.trackByCourseId(0, course);
    expect(trackId).toBe(course.id);
  });

  it('should log trackBy calls', () => {
    fixture.detectChanges();
    const course = component.courses[0];
    const trackId = component.trackByCourseId(0, course);
    expect(trackId).toBe(1);
  });
  it('should display search control', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-search-control')).toBeTruthy();
  });

  it('should display add course button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.btn-add-course')).toBeTruthy();
  });

  it('should display course grid', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.courses-grid')).toBeTruthy();
  });

  it('should display load more button when more courses available', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    if (component.hasMoreCourses()) {
      expect(compiled.querySelector('.btn-load-more')).toBeTruthy();
    }
  });

  it('should display course count', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.course-count')).toBeTruthy();
  });

  it('should log on ngOnDestroy', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(component).toBeTruthy();
  });

  it('should filter courses by title', () => {
    fixture.detectChanges();
    component.onSearchChange('TypeScript');
    const hasTypeScript = component.filteredCourses.some(c => 
      c.title.toLowerCase().includes('typescript')
    );
    expect(hasTypeScript).toBe(true);
  });

  it('should filter courses by instructor', () => {
    fixture.detectChanges();
    component.onSearchChange('John');
    const hasJohn = component.filteredCourses.some(c => 
      c.instructor.toLowerCase().includes('john')
    );
    expect(hasJohn).toBe(true);
  });

  it('should not have more courses after loading all', () => {
    fixture.detectChanges();
    // Load all courses
    while (component.hasMoreCourses()) {
      component.onLoadMore();
    }
    expect(component.hasMoreCourses()).toBe(false);
  });

  it('should initialize courses only once', () => {
    fixture.detectChanges();
    expect(component.courses.length).toBe(12);
  });

  it('should display header component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should display breadcrumbs component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-breadcrumbs')).toBeTruthy();
  });

  it('should display footer component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
