import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CourseFreshnessDirective } from './course-freshness.directive';

@Component({
  template: `
    <div 
      [appCourseFreshness]="courseDate"
      [freshBorderColor]="freshColor"
      [upcomingBorderColor]="upcomingColor"
      id="test-element">
      Test
    </div>
  `,
  standalone: true,
  imports: [CourseFreshnessDirective]
})
class TestComponent {
  courseDate: Date = new Date();
  freshColor: string = '3px solid #4CAF50';
  upcomingColor: string = '3px solid #2196F3';
}

describe('CourseFreshnessDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('#test-element'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply green border for fresh courses (within 14 days)', () => {
    // Course created 5 days ago
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    component.courseDate = fiveDaysAgo;
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('3px solid #4CAF50');
  });

  it('should not apply border for old courses (older than 14 days)', () => {
    // Course created 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    component.courseDate = thirtyDaysAgo;
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('');
  });

  it('should apply blue border for upcoming courses (future date)', () => {
    // Course created 5 days in the future
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
    component.courseDate = fiveDaysLater;
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('3px solid #2196F3');
  });

  it('should respect custom fresh border color', () => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    component.courseDate = fiveDaysAgo;
    component.freshColor = '2px solid #FF0000';
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('2px solid #FF0000');
  });

  it('should respect custom upcoming border color', () => {
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
    component.courseDate = fiveDaysLater;
    component.upcomingColor = '4px solid #00FF00';
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('4px solid #00FF00');
  });

  it('should handle edge case: exactly 14 days old (fresh)', () => {
    const exactlyFourteenDaysAgo = new Date();
    exactlyFourteenDaysAgo.setDate(exactlyFourteenDaysAgo.getDate() - 14);
    component.courseDate = exactlyFourteenDaysAgo;
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('3px solid #4CAF50');
  });

  it('should handle edge case: 15 days old (not fresh)', () => {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    component.courseDate = fifteenDaysAgo;
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('');
  });

  it('should handle today as fresh', () => {
    component.courseDate = new Date();
    
    fixture.detectChanges();
    
    const border = element.nativeElement.style.border;
    expect(border).toBe('3px solid #4CAF50');
  });
});
