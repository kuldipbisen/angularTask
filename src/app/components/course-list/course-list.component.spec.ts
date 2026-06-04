import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { SearchComponent } from './search/search.component';
import { AddCourseComponent } from './add-course/add-course.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent, CourseItemComponent, SearchComponent, AddCourseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses array', () => {
    expect(component.courses.length).toBe(5);
  });

  it('should filter courses on search', () => {
    component.onSearch('Angular');
    expect(component.filteredCourses.length).toBeGreaterThan(0);
  });

  it('should delete course', () => {
    const initialLength = component.courses.length;
    component.onDeleteClick(1);
    expect(component.courses.length).toBe(initialLength - 1);
  });

  it('should handle edit click', () => {
    spyOn(console, 'log');
    component.onEditClick(component.courses[0]);
    expect(console.log).toHaveBeenCalled();
  });

  it('should handle load more', () => {
    spyOn(console, 'log');
    component.onLoadMore();
    expect(console.log).toHaveBeenCalledWith('Load more clicked');
  });
});
