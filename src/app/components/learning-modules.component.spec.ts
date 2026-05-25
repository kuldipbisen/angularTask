import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningModulesComponent } from './learning-modules.component';

describe('LearningModulesComponent', () => {
  let component: LearningModulesComponent;
  let fixture: ComponentFixture<LearningModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningModulesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LearningModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 learning modules', () => {
    expect(component.modules.length).toBe(6);
  });

  it('should have basic module as first module', () => {
    expect(component.modules[0].id).toBe('basic');
  });

  it('should set first module as active by default', () => {
    expect(component.modules[0].isActive).toBe(true);
  });

  it('should get active module correctly', () => {
    const activeModule = component.activeModule;
    expect(activeModule.isActive).toBe(true);
    expect(activeModule.id).toBe('basic');
  });

  it('should switch to communication module', () => {
    component.selectModule('communication');
    expect(component.activeModule.id).toBe('communication');
    expect(component.activeModule.isActive).toBe(true);
  });

  it('should only have one active module at a time', () => {
    component.selectModule('lifecycle');
    const activeModules = component.modules.filter(m => m.isActive);
    expect(activeModules.length).toBe(1);
    expect(activeModules[0].id).toBe('lifecycle');
  });

  it('should switch to all modules', () => {
    const moduleIds = ['basic', 'communication', 'lifecycle', 'references', 'events', 'dynamic'];
    moduleIds.forEach(id => {
      component.selectModule(id);
      expect(component.activeModule.id).toBe(id);
    });
  });

  it('should display header', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header')).toBeTruthy();
  });

  it('should display navigation buttons', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.nav-button').length).toBe(6);
  });

  it('should display content section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content')).toBeTruthy();
  });

  it('should display footer', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.footer')).toBeTruthy();
  });

  it('should display basic module content initially', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-counter')).toBeTruthy();
  });
});
