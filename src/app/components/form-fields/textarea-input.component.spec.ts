import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaInputComponent } from './textarea-input.component';
import { FormControl, Validators } from '@angular/forms';

describe('TextareaInputComponent', () => {
  let component: TextareaInputComponent;
  let fixture: ComponentFixture<TextareaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaInputComponent);
    component = fixture.componentInstance;
    component.label = 'Description';
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display textarea', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should have default rows value of 4', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.getAttribute('rows')).toBe('4');
  });

  it('should accept custom rows value', () => {
    component.rows = 6;
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.getAttribute('rows')).toBe('6');
  });

  it('should display label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Description');
  });
});
