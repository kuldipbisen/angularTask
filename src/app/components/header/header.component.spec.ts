import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title property', () => {
    expect(component.title).toBe('Course Management Platform');
  });

  it('should have subtitle property', () => {
    expect(component.subtitle).toBe('Manage and browse available courses');
  });

  it('should display title in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header-title').textContent).toContain('Course Management Platform');
  });

  it('should display subtitle in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header-subtitle').textContent).toContain('Manage and browse available courses');
  });

  it('should initialize with title', () => {
    fixture.detectChanges();
    expect(component.title).toBe('Course Management Platform');
  });

  it('should be destroyed after fixture destroy', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(component).toBeTruthy();
  });

  it('should have header element with correct class', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-header')).toBeTruthy();
  });
});
