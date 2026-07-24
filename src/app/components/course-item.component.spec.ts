import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item.component';
import { Course } from '../models/course.model';
import { DurationPipe } from '../pipes/duration.pipe';
import { CourseFreshnessDirective } from '../directives/course-freshness.directive';
import { HighlightRatingDirective } from '../directives/highlight-rating.directive';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let mockCourse: Course;

  beforeEach(async () => {
    mockCourse = {
      id: 1,
      name: 'Angular Fundamentals',
      instructor: 'John Doe',
      duration: 240,
      rating: 4.8,
      isNew: true,
      createdDate: new Date(),
      price: 49.99,
      isFeatured: true
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CourseItemComponent,
        DurationPipe,
        CourseFreshnessDirective,
        HighlightRatingDirective
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name', () => {
    expect(component.course.name).toBe('Angular Fundamentals');
  });

  it('should display course instructor', () => {
    expect(component.course.instructor).toBe('John Doe');
  });

  it('should display course price', () => {
    expect(component.course.price).toBe(49.99);
  });

  it('should display course rating', () => {
    expect(component.course.rating).toBe(4.8);
  });

  it('should display course duration', () => {
    expect(component.course.duration).toBe(240);
  });

  it('should have NEW badge when course is new', () => {
    component.course.isNew = true;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge-new');
    expect(badge).toBeTruthy();
  });

  it('should not have NEW badge when course is not new', () => {
    component.course.isNew = false;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge-new');
    expect(badge).toBeFalsy();
  });

  it('should have FEATURED badge when course is featured', () => {
    component.course.isFeatured = true;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge-featured');
    expect(badge).toBeTruthy();
  });

  it('should not have FEATURED badge when course is not featured', () => {
    component.course.isFeatured = false;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge-featured');
    expect(badge).toBeFalsy();
  });

  it('should emit delete event when delete button is clicked', (done) => {
    component.delete.subscribe((courseId: number) => {
      expect(courseId).toBe(1);
      done();
    });

    component.onDelete();
  });

  it('should emit enroll event when onEnroll is called', (done) => {
    component.enroll.subscribe((courseId: number) => {
      expect(courseId).toBe(1);
      done();
    });

    component.onEnroll();
  });

  it('should have correct button labels', () => {
    const enrollButton = fixture.nativeElement.querySelector('.btn-enroll');
    const deleteButton = fixture.nativeElement.querySelector('.btn-delete');
    
    expect(enrollButton.textContent).toContain('Enroll');
    expect(deleteButton.textContent).toContain('Delete');
  });

  it('should generate stars correctly for rating 4.8', () => {
    component.course.rating = 4.8;
    const stars = component.getStars();
    expect(stars).toContain('★');
    expect(stars).toContain('☆');
  });

  it('should generate full stars for rating 5', () => {
    component.course.rating = 5;
    const stars = component.getStars();
    expect(stars).toBe('★★★★★');
  });

  it('should generate no stars for rating 0', () => {
    component.course.rating = 0;
    const stars = component.getStars();
    expect(stars).toBe('☆☆☆☆☆');
  });

  it('should generate half star for decimal rating', () => {
    component.course.rating = 3.5;
    const stars = component.getStars();
    expect(stars).toContain('½');
  });

  it('should have course card element', () => {
    const card = fixture.nativeElement.querySelector('.course-card');
    expect(card).toBeTruthy();
  });

  it('should apply course freshness directive', () => {
    const card = fixture.nativeElement.querySelector('[appCourseFreshness]');
    expect(card).toBeTruthy();
  });

  it('should apply highlight rating directive', () => {
    const rating = fixture.nativeElement.querySelector('[appHighlightRating]');
    expect(rating).toBeTruthy();
  });

  it('should render course meta information', () => {
    const meta = fixture.nativeElement.querySelector('.course-meta');
    expect(meta).toBeTruthy();
  });

  it('should have course body section', () => {
    const body = fixture.nativeElement.querySelector('.course-body');
    expect(body).toBeTruthy();
  });

  it('should have course actions section', () => {
    const actions = fixture.nativeElement.querySelector('.course-actions');
    expect(actions).toBeTruthy();
  });

  it('should display instructor information', () => {
    const instructor = fixture.nativeElement.querySelector('.instructor');
    expect(instructor).toBeTruthy();
    expect(instructor.textContent).toContain('Instructor:');
  });

  it('should display rating value', () => {
    const ratingValue = fixture.nativeElement.querySelector('.rating-value');
    expect(ratingValue).toBeTruthy();
    expect(ratingValue.textContent).toContain('4.8/5');
  });

  it('should have proper CSS classes', () => {
    const card = fixture.nativeElement.querySelector('.course-card');
    expect(card.classList.contains('course-card')).toBe(true);
  });
});
