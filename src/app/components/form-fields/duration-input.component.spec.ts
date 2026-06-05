import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationInputComponent } from './duration-input.component';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurationInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;
    component.label = 'Duration';
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Duration');
  });

  it('should display duration input', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('number');
  });

  it('should display formatted duration', () => {
    component.control.setValue(88);
    fixture.detectChanges();

    const durationDisplay = fixture.nativeElement.querySelector('.duration-display');
    expect(durationDisplay.textContent).toContain('1h 28min');
  });

  it('should display "/ 1h" for 60 minutes', () => {
    component.control.setValue(60);
    fixture.detectChanges();

    const durationDisplay = fixture.nativeElement.querySelector('.duration-display');
    expect(durationDisplay.textContent).toContain('1h');
  });

  it('should not display duration when input is empty', () => {
    component.control.setValue('');
    fixture.detectChanges();

    const durationDisplay = fixture.nativeElement.querySelector('.duration-display');
    expect(durationDisplay).toBeFalsy();
  });

  it('should apply min and max attributes', () => {
    component.minValue = 1;
    component.maxValue = 500;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('min')).toBe('1');
    expect(input.getAttribute('max')).toBe('500');
  });
});
