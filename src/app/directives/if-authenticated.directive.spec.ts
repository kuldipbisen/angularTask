import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

@Component({
  template: `
    <div *appIfAuthenticated="isAuthenticated">Authenticated Content</div>
    <div *ngIf="!isAuthenticated">Not Authenticated</div>
  `,
  standalone: true,
  imports: [IfAuthenticatedDirective, CommonModule]
})
class TestComponent {
  isAuthenticated = true;
}

describe('IfAuthenticatedDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, IfAuthenticatedDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create directive', () => {
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective));
    expect(directive).toBeTruthy();
  });

  it('should display content when authenticated is true', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('div'));
    expect(content?.nativeElement.textContent).toContain('Authenticated Content');
  });

  it('should hide content when authenticated is false', () => {
    component.isAuthenticated = false;
    fixture.detectChanges();

    const authenticatedDiv = fixture.debugElement.queryAll(By.css('div'));
    const hasAuthenticatedContent = authenticatedDiv.some(el => 
      el.nativeElement.textContent.includes('Authenticated Content')
    );
    expect(hasAuthenticatedContent).toBeFalsy();
  });

  it('should toggle content on authentication change', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();

    let authenticatedDiv = fixture.debugElement.query(By.css('div'));
    expect(authenticatedDiv?.nativeElement.textContent).toContain('Authenticated Content');

    component.isAuthenticated = false;
    fixture.detectChanges();

    authenticatedDiv = fixture.debugElement.query(By.css('[*appIfAuthenticated]'));
    expect(authenticatedDiv).toBeFalsy();
  });

  it('should handle null value gracefully', () => {
    component.isAuthenticated = null as any;
    fixture.detectChanges();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should handle undefined value gracefully', () => {
    component.isAuthenticated = undefined as any;
    fixture.detectChanges();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
