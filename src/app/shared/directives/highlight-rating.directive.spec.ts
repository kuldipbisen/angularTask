import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighlightRatingDirective } from './highlight-rating.directive';

@Component({
  template: `
    <div 
      [appHighlightRating]="isTopRated"
      [highlightBackgroundColor]="bgColor"
      id="test-element">
      Test Content
    </div>
  `,
  standalone: true,
  imports: [HighlightRatingDirective]
})
class TestComponent {
  isTopRated: boolean = false;
  bgColor: string = '#fff3cd';
}

describe('HighlightRatingDirective', () => {
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

  it('should not apply highlighting when topRated is false', () => {
    component.isTopRated = false;
    fixture.detectChanges();
    
    const nativeElement = element.nativeElement;
    expect(nativeElement.innerHTML).not.toContain('★');
    expect(nativeElement.style.backgroundColor).toBe('');
  });

  it('should apply highlighting when topRated is true', () => {
    component.isTopRated = true;
    fixture.detectChanges();
    
    const nativeElement = element.nativeElement;
    expect(nativeElement.innerHTML).toContain('★');
    expect(nativeElement.style.backgroundColor).toBe('#fff3cd');
  });

  it('should add star icon at the beginning', () => {
    component.isTopRated = true;
    fixture.detectChanges();
    
    const nativeElement = element.nativeElement;
    const contentWithStar = nativeElement.innerHTML;
    const starIndex = contentWithStar.indexOf('★');
    const testContentIndex = contentWithStar.indexOf('Test Content');
    
    expect(starIndex).toBeLessThan(testContentIndex);
  });

  it('should apply custom background color', () => {
    component.isTopRated = true;
    component.bgColor = '#FFD700';
    fixture.detectChanges();
    
    const nativeElement = element.nativeElement;
    expect(nativeElement.style.backgroundColor).toBe('#FFD700');
  });

  it('should apply border-radius when topRated', () => {
    component.isTopRated = true;
    fixture.detectChanges();
    
    const nativeElement = element.nativeElement;
    expect(nativeElement.style.borderRadius).toBe('8px');
  });

  it('should apply padding when topRated', () => {
    component.isTopRated = true;
    fixture.detectChanges();
    
    const nativeElement = element.nativeElement;
    expect(nativeElement.style.padding).toBe('12px');
  });

  it('should toggle highlighting on property change', () => {
    component.isTopRated = false;
    fixture.detectChanges();
    
    let nativeElement = element.nativeElement;
    expect(nativeElement.innerHTML).not.toContain('★');
    
    component.isTopRated = true;
    fixture.detectChanges();
    
    nativeElement = element.nativeElement;
    expect(nativeElement.innerHTML).toContain('★');
  });

  it('should handle multiple color changes', () => {
    component.isTopRated = true;
    
    component.bgColor = '#FF0000';
    fixture.detectChanges();
    expect(element.nativeElement.style.backgroundColor).toBe('#FF0000');
    
    component.bgColor = '#00FF00';
    fixture.detectChanges();
    expect(element.nativeElement.style.backgroundColor).toBe('#00FF00');
  });
});
