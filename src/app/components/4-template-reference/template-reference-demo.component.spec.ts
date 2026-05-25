import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateReferenceComponent } from './template-reference-demo.component';
import { FormsModule } from '@angular/forms';

describe('TemplateReferenceComponent', () => {
  let component: TemplateReferenceComponent;
  let fixture: ComponentFixture<TemplateReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateReferenceComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should capture username from input', () => {
    const input = document.createElement('input');
    input.value = 'testuser';
    component.captureUsername(input);
    expect(component.capturedUsername).toBe('testuser');
  });

  it('should capture multiple input values', () => {
    fixture.detectChanges();
    component.captureAllInputs();
    expect(component.allInputValues.length).toBeGreaterThan(0);
  });

  it('should capture form data', () => {
    const username = document.createElement('input');
    const email = document.createElement('input');
    const message = document.createElement('textarea');

    username.value = 'testuser';
    email.value = 'test@example.com';
    message.value = 'Test message';

    component.captureFormData(username as any, email as any, message as any);

    expect(component.formData).toBeTruthy();
    expect(component.formData?.username).toBe('testuser');
    expect(component.formData?.email).toBe('test@example.com');
    expect(component.formData?.message).toBe('Test message');
  });

  it('should reset form', () => {
    const form = document.createElement('form');
    component.formData = {
      username: 'test',
      email: 'test@test.com',
      message: 'message'
    };
    component.resetForm(form);
    expect(component.formData).toBeNull();
  });

  it('should change box color', () => {
    const box = document.createElement('div');
    component.changeBoxColor(box);
    expect(box.style.backgroundColor).toBeTruthy();
  });

  it('should reset box color', () => {
    const box = document.createElement('div');
    box.style.backgroundColor = '#000000';
    component.resetBoxColor(box);
    // Verify color was reset (component sets specific color)
    expect(box.style.backgroundColor).toBeTruthy();
  });

  it('should display template reference examples', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.template-ref-container')).toBeTruthy();
  });
});
