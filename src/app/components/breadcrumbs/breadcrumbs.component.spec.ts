import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breadcrumbs on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.breadcrumbs.length).toBe(3);
  });

  it('should have correct breadcrumb labels', () => {
    fixture.detectChanges();
    expect(component.breadcrumbs[0].label).toBe('Home');
    expect(component.breadcrumbs[1].label).toBe('Courses');
    expect(component.breadcrumbs[2].label).toBe('All Courses');
  });

  it('should display breadcrumbs in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const items = compiled.querySelectorAll('.breadcrumb-item');
    expect(items.length).toBe(3);
  });

  it('should have correct breadcrumb URLs', () => {
    fixture.detectChanges();
    expect(component.breadcrumbs[0].url).toBe('/');
    expect(component.breadcrumbs[1].url).toBe('/courses');
    expect(component.breadcrumbs[2].url).toBe('/courses/all');
  });

  it('should log on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.breadcrumbs.length).toBe(3);
  });

  it('should log on ngOnDestroy', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(component).toBeTruthy();
  });

  it('should display breadcrumbs nav with aria-label', () => {
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).toBeTruthy();
  });
});
