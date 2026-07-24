import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightRatingDirective } from './highlight-rating.directive';

@Component({
  template: '<div [appHighlightRating]="rating">Course Card</div>',
  standalone: true,
  imports: [HighlightRatingDirective]
})
class TestComponent {
  rating = 4.5;
}

describe('HighlightRatingDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, HighlightRatingDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(HighlightRatingDirective));
    fixture.detectChanges();
  });

  it('should create directive', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should apply gold background for rating >= 4.5', () => {
    component.rating = 4.8;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.backgroundColor).toBe('rgb(255, 215, 0)'); // #ffd700
  });

  it('should apply red left border for rating >= 4.5', () => {
    component.rating = 4.7;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.borderLeft).toContain('5px');
    expect(element.style.borderLeft).toContain('rgb(255, 107, 107)'); // #ff6b6b
  });

  it('should apply silver background for rating >= 4.0 and < 4.5', () => {
    component.rating = 4.2;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.backgroundColor).toBe('rgb(192, 192, 192)'); // #c0c0c0
  });

  it('should apply cyan left border for rating >= 4.0 and < 4.5', () => {
    component.rating = 4.1;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.borderLeft).toContain('5px');
  });

  it('should apply standard styling for rating < 4.0', () => {
    component.rating = 3.8;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.borderLeft).toContain('5px');
  });

  it('should apply padding-left style', () => {
    component.rating = 4.5;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.paddingLeft).toBe('10px');
  });

  it('should handle perfect rating (5.0)', () => {
    component.rating = 5.0;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.backgroundColor).toBe('rgb(255, 215, 0)'); // #ffd700
  });

  it('should handle minimum rating (0)', () => {
    component.rating = 0;
    fixture.detectChanges();

    const element = directiveElement.nativeElement;
    expect(element.style.borderLeft).toContain('5px');
  });
});
