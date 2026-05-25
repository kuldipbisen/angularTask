import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicComponentsDemoComponent, WidgetComponent, ButtonWidgetComponent, CardWidgetComponent } from './dynamic-components-demo.component';

describe('DynamicComponentsDemoComponent', () => {
  let component: DynamicComponentsDemoComponent;
  let fixture: ComponentFixture<DynamicComponentsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicComponentsDemoComponent,
        WidgetComponent,
        ButtonWidgetComponent,
        CardWidgetComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicComponentsDemoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 0 dynamic components', () => {
    expect(component.dynamicComponentCount).toBe(0);
  });

  it('should display add widget buttons', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.button-group')).toBeTruthy();
  });

  it('should display dynamic container', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container')).toBeTruthy();
  });

  it('should display info section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.info-section')).toBeTruthy();
  });
});

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display widget title', () => {
    component.title = 'Test Widget';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Test Widget');
  });

  it('should display widget description', () => {
    component.description = 'Test Description';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Test Description');
  });

  it('should display widget content', () => {
    component.content = 'Test Content';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.widget-content')).toBeTruthy();
  });
});

describe('ButtonWidgetComponent', () => {
  let component: ButtonWidgetComponent;
  let fixture: ComponentFixture<ButtonWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWidgetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize click count to 0', () => {
    expect(component.clickCount).toBe(0);
  });

  it('should increment click count on button click', () => {
    component.handleClick();
    expect(component.clickCount).toBe(1);
    component.handleClick();
    expect(component.clickCount).toBe(2);
  });

  it('should display button title', () => {
    component.title = 'Action Button';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Action Button');
  });
});

describe('CardWidgetComponent', () => {
  let component: CardWidgetComponent;
  let fixture: ComponentFixture<CardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWidgetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card title', () => {
    component.cardTitle = 'Test Card';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Test Card');
  });

  it('should display card body', () => {
    component.cardBody = 'Card Body Content';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-body').textContent).toContain('Card Body Content');
  });

  it('should display card footer', () => {
    component.cardFooter = 'Card Footer';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-footer')).toBeTruthy();
  });
});
