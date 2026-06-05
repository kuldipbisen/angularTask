import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormButtonsComponent } from './form-buttons.component';
import { By } from '@angular/platform-browser';

describe('FormButtonsComponent', () => {
  let component: FormButtonsComponent;
  let fixture: ComponentFixture<FormButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormButtonsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display save and cancel buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('should emit save event when save button is clicked', () => {
    const saveSpy = jest.spyOn(component.save, 'emit');
    const saveButton = fixture.debugElement.query(By.css('.btn-primary'));

    saveButton.nativeElement.click();

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel button is clicked', () => {
    const cancelSpy = jest.spyOn(component.cancel, 'emit');
    const cancelButton = fixture.debugElement.query(By.css('.btn-secondary'));

    cancelButton.nativeElement.click();

    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should display loading text when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('.btn-primary'));
    expect(saveButton.nativeElement.textContent).toContain('Saving...');
  });

  it('should disable buttons when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons.forEach(button => {
      expect(button.nativeElement.disabled).toBe(true);
    });
  });

  it('should use custom save text', () => {
    component.saveText = 'Submit';
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('.btn-primary'));
    expect(saveButton.nativeElement.textContent).toContain('Submit');
  });

  it('should use custom cancel text', () => {
    component.cancelText = 'Back';
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(By.css('.btn-secondary'));
    expect(cancelButton.nativeElement.textContent).toContain('Back');
  });
});
