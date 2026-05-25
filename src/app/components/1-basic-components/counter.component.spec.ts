import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with count = 0', () => {
    expect(component.count).toBe(0);
  });

  it('should increment count', () => {
    component.increment();
    expect(component.count).toBe(1);
  });

  it('should decrement count', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  it('should not go below 0 when decrementing', () => {
    component.count = 0;
    component.decrement();
    expect(component.count).toBe(0);
  });

  it('should reset count to 0', () => {
    component.count = 10;
    component.reset();
    expect(component.count).toBe(0);
  });

  it('should display count in template', () => {
    component.count = 5;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('strong').textContent).toContain('5');
  });

  it('should show warning message when count > 5', () => {
    component.count = 6;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.warning')).toBeTruthy();
  });

  it('should show success message when count === 10', () => {
    component.count = 10;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.success')).toBeTruthy();
  });
});
