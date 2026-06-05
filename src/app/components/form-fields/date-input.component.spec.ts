import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateInputComponent } from './date-input.component';
import { FormControl, Validators } from '@angular/forms';

describe('DateInputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    component.label = 'Date';
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display date input', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('date');
  });

  it('should display label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Date');
  });

  it('should display required indicator when required is true', () => {
    component.required = true;
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('.required');
    expect(requiredSpan).toBeTruthy();
  });
});
