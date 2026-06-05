import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';
import { FormControl, Validators } from '@angular/forms';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Test Label');
  });

  it('should display required indicator when required is true', () => {
    component.required = true;
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('.required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toContain('*required');
  });

  it('should not display required indicator when required is false', () => {
    component.required = false;
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('.required');
    expect(requiredSpan).toBeFalsy();
  });

  it('should display placeholder', () => {
    component.placeholder = 'Test placeholder';
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Test placeholder');
  });
});
