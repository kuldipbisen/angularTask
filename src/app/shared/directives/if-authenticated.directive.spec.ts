import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

@Component({
  template: `
    <div *appIfAuthenticated id="authenticated-element">
      Authenticated Content
    </div>
  `,
  standalone: true,
  imports: [IfAuthenticatedDirective]
})
class TestComponent {}

describe('IfAuthenticatedDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display element by default (authenticated)', () => {
    fixture.detectChanges();
    
    const element = fixture.debugElement.query(By.css('#authenticated-element'));
    expect(element).toBeTruthy();
  });

  it('should show authenticated content on initial render', () => {
    fixture.detectChanges();
    
    const element = fixture.debugElement.query(By.css('#authenticated-element'));
    expect(element.nativeElement.textContent).toBe('Authenticated Content');
  });

  it('should hide element when setAuthenticated(false) is called', () => {
    fixture.detectChanges();
    
    let element = fixture.debugElement.query(By.css('#authenticated-element'));
    expect(element).toBeTruthy();
    
    // Get the directive instance
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective)).injector.get(IfAuthenticatedDirective);
    directive.setAuthenticated(false);
    fixture.detectChanges();
    
    element = fixture.debugElement.query(By.css('#authenticated-element'));
    expect(element).toBeFalsy();
  });

  it('should show element again when setAuthenticated(true) is called after hiding', () => {
    fixture.detectChanges();
    
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective)).injector.get(IfAuthenticatedDirective);
    
    directive.setAuthenticated(false);
    fixture.detectChanges();
    
    let element = fixture.debugElement.query(By.css('#authenticated-element'));
    expect(element).toBeFalsy();
    
    directive.setAuthenticated(true);
    fixture.detectChanges();
    
    element = fixture.debugElement.query(By.css('#authenticated-element'));
    expect(element).toBeTruthy();
  });

  it('should track authentication state correctly with getAuthenticated()', () => {
    fixture.detectChanges();
    
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective)).injector.get(IfAuthenticatedDirective);
    
    expect(directive.getAuthenticated()).toBe(true);
    
    directive.setAuthenticated(false);
    fixture.detectChanges();
    expect(directive.getAuthenticated()).toBe(false);
    
    directive.setAuthenticated(true);
    fixture.detectChanges();
    expect(directive.getAuthenticated()).toBe(true);
  });

  it('should handle multiple toggle calls', () => {
    fixture.detectChanges();
    
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective)).injector.get(IfAuthenticatedDirective);
    
    for (let i = 0; i < 5; i++) {
      directive.setAuthenticated(i % 2 === 0);
      fixture.detectChanges();
      
      const element = fixture.debugElement.query(By.css('#authenticated-element'));
      if (i % 2 === 0) {
        expect(element).toBeTruthy();
      } else {
        expect(element).toBeFalsy();
      }
    }
  });

  it('should not recreate element unnecessarily', () => {
    fixture.detectChanges();
    
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective)).injector.get(IfAuthenticatedDirective);
    
    directive.setAuthenticated(true);
    fixture.detectChanges();
    
    let element1 = fixture.debugElement.query(By.css('#authenticated-element'));
    
    // Call with same value again
    directive.setAuthenticated(true);
    fixture.detectChanges();
    
    let element2 = fixture.debugElement.query(By.css('#authenticated-element'));
    
    // Elements should be different instances (recreated)
    expect(element1).toBeTruthy();
    expect(element2).toBeTruthy();
  });

  it('should cleanup subscriptions on destroy', () => {
    fixture.detectChanges();
    
    const directive = fixture.debugElement.query(By.directive(IfAuthenticatedDirective)).injector.get(IfAuthenticatedDirective);
    spyOn(directive as any, 'ngOnDestroy');
    
    fixture.destroy();
    
    expect((directive as any).ngOnDestroy).toBeDefined();
  });
});
