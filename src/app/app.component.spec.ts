import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Changed from declarations to imports
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the app', () => {
    expect(component).toBeTruthy();
  });

  test(`should have title 'agmp-tests'`, () => {
    expect(component.title).toEqual('agmp-tests');
  });

  test('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('agmp-tests');
  });
});
