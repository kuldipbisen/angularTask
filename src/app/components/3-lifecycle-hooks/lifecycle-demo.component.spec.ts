import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LifecycleDemoComponent } from './lifecycle-demo.component';
import { FormsModule } from '@angular/forms';

describe('LifecycleDemoComponent', () => {
  let component: LifecycleDemoComponent;
  let fixture: ComponentFixture<LifecycleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleDemoComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LifecycleDemoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name property', () => {
    expect(component.name).toBe('Angular Component');
  });

  it('should have counter property', () => {
    expect(component.counter).toBe(0);
  });

  it('should not be initialized until ngOnInit runs', () => {
    expect(component.isInitialized).toBe(false);
  });

  it('should log events when lifecycle hooks run', () => {
    // Component instantiation itself calls constructor hook
    const initialLogLength = component.lifecycleLog.length;
    expect(initialLogLength).toBeGreaterThanOrEqual(1);
  });

  it('should log lifecycle events', () => {
    // Component should have logged constructor event
    expect(component.lifecycleLog.length).toBeGreaterThan(0);
  });

  it('should clear lifecycle log', () => {
    component.clearLog();
    expect(component.lifecycleLog.length).toBe(0);
  });

  it('should update name property', () => {
    component.name = 'Test Name';
    expect(component.name).toBe('Test Name');
  });

  it('should update counter property', () => {
    component.counter = 5;
    expect(component.counter).toBe(5);
  });
});
