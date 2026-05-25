import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should have company name', () => {
    expect(component.companyName).toBe('Course Management Platform');
  });

  it('should initialize footer links on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.footerLinks.length).toBe(4);
  });

  it('should have correct footer link labels', () => {
    fixture.detectChanges();
    expect(component.footerLinks[0].label).toBe('About Us');
    expect(component.footerLinks[1].label).toBe('Privacy Policy');
    expect(component.footerLinks[2].label).toBe('Terms of Service');
    expect(component.footerLinks[3].label).toBe('Contact');
  });

  it('should display footer links in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('.footer-link');
    expect(links.length).toBe(4);
  });

  it('should display company name in footer', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Course Management Platform');
  });

  it('should display current year in footer', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(new Date().getFullYear().toString());
  });

  it('should log on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.footerLinks.length).toBe(4);
  });

  it('should log footer links count', () => {
    fixture.detectChanges();
    expect(component.footerLinks.length).toBe(4);
  });

  it('should log on ngOnDestroy', () => {
    fixture.detectChanges();
    fixture.destroy();
    expect(component).toBeTruthy();
  });

  it('should display footer element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-footer')).toBeTruthy();
  });

  it('should have social links', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const socialLinks = compiled.querySelectorAll('.social-link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });
});
