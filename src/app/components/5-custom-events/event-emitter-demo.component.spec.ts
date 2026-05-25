import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitterDemoComponent, NotificationComponent } from './event-emitter-demo.component';

describe('EventEmitterDemoComponent', () => {
  let component: EventEmitterDemoComponent;
  let fixture: ComponentFixture<EventEmitterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventEmitterDemoComponent, NotificationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EventEmitterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success notification', () => {
    component.showNotification('success', 'Test message');
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('success');
  });

  it('should show error notification', () => {
    component.showNotification('error', 'Error message');
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('error');
  });

  it('should show warning notification', () => {
    component.showNotification('warning', 'Warning message');
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('warning');
  });

  it('should show info notification', () => {
    component.showNotification('info', 'Info message');
    expect(component.notifications.length).toBe(1);
    expect(component.notifications[0].type).toBe('info');
  });

  it('should remove notification', () => {
    component.showNotification('success', 'Test message');
    const notificationId = component.notifications[0].id;
    component.removeNotification(notificationId);
    expect(component.notifications.length).toBe(0);
  });

  it('should log events', () => {
    component.showNotification('success', 'Test message');
    expect(component.eventLog.length).toBeGreaterThan(0);
  });

  it('should clear event log', () => {
    component.showNotification('success', 'Test message');
    component.clearEventLog();
    expect(component.eventLog.length).toBe(0);
  });

  it('should display control buttons', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display notifications container', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.notifications')).toBeTruthy();
  });

  it('should display event log', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.event-log')).toBeTruthy();
  });
});

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success notification', () => {
    component.type = 'success';
    component.message = 'Success message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.notification-success')).toBeTruthy();
  });

  it('should emit closed event', (done) => {
    component.id = 1;
    component.closed.subscribe((id: number) => {
      expect(id).toBe(1);
      done();
    });
    component.close();
  });

  it('should display correct icon for success', () => {
    component.type = 'success';
    expect(component.getIcon()).toBe('✓');
  });

  it('should display correct icon for error', () => {
    component.type = 'error';
    expect(component.getIcon()).toBe('✕');
  });

  it('should display correct title', () => {
    component.type = 'success';
    expect(component.getTitle()).toBe('Success');
  });
});
