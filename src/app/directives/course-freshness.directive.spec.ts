import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseFreshnessDirective } from './course-freshness.directive';

@Component({
  template: '<div [appCourseFreshness]="courseDate">Test Course</div>',
  standalone: true,
  imports: [CourseFreshnessDirective]
})
class TestComponent {
  courseDate = new Date();
}

describe('CourseFreshnessDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, CourseFreshnessDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(CourseFreshnessDirective));
  });

  it('should create directive', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should add fresh-course class for courses created within 7 days', () => {
    component.courseDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.classList.contains('fresh-course')).toBeTruthy();
  });

  it('should add NEW badge for fresh courses', () => {
    component.courseDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    const badge = element.querySelector('.badge-new');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('NEW');
  });

  it('should not add fresh-course class for older courses', () => {
    component.courseDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.classList.contains('fresh-course')).toBeFalsy();
  });

  it('should handle courses created exactly 7 days ago', () => {
    component.courseDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // exactly 7 days
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.classList.contains('fresh-course')).toBeTruthy();
  });

  it('should handle today\'s courses', () => {
    component.courseDate = new Date();
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.classList.contains('fresh-course')).toBeTruthy();
  });
});
