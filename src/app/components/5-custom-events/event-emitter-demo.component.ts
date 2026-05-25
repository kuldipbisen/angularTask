import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NotificationEvent {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

/**
 * NOTIFICATION CHILD COMPONENT
 * 
 * Demonstrates using EventEmitter to emit custom events
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification" [class]="'notification-' + type">
      <div class="notification-content">
        <span class="icon">
          {{ getIcon() }}
        </span>
        <div class="message">
          <strong>{{ getTitle() }}</strong>
          <p>{{ message }}</p>
        </div>
        <button (click)="close()" class="close-btn">×</button>
      </div>
    </div>
  `,
  styles: [`
    .notification {
      display: flex;
      margin-bottom: 10px;
      border-radius: 4px;
      padding: 12px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .notification-success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
    }

    .notification-error {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .notification-warning {
      background: #fff3cd;
      border: 1px solid #ffeeba;
      color: #856404;
    }

    .notification-info {
      background: #d1ecf1;
      border: 1px solid #bee5eb;
      color: #0c5460;
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .message {
      flex: 1;
    }

    strong {
      display: block;
      margin-bottom: 2px;
    }

    p {
      margin: 0;
      font-size: 14px;
    }

    .close-btn {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: inherit;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      opacity: 0.7;
    }
  `]
})
export class NotificationComponent {
  @Input() type: NotificationEvent['type'] = 'info';
  @Input() message: string = '';
  @Input() id: number = 0;

  @Output() closed = new EventEmitter<number>();

  getIcon(): string {
    switch (this.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
    }
  }

  getTitle(): string {
    return this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }

  close(): void {
    this.closed.emit(this.id);
  }
}

/**
 * EVENT EMITTER DEMO COMPONENT (Parent)
 * 
 * This component demonstrates:
 * - Creating custom EventEmitters in child components
 * - Emitting custom events with data payload
 * - Handling emitted events from child components
 * - Managing parent state based on child events
 * 
 * Learning Goals:
 * - Understand how to emit custom events
 * - Learn about event payloads
 * - Master parent-child event communication
 * - Handle multiple child events in parent
 */
@Component({
  selector: 'app-event-emitter-demo',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './event-emitter-demo.component.html',
  styleUrls: ['./event-emitter-demo.component.scss']
})
export class EventEmitterDemoComponent {
  notifications: NotificationEvent[] = [];
  eventLog: string[] = [];
  private nextId = 1;

  /**
   * Trigger a notification by emitting event from parent
   * This simulates child events
   */
  showNotification(type: NotificationEvent['type'], message: string): void {
    const notification: NotificationEvent = {
      id: this.nextId++,
      type,
      message,
      timestamp: new Date()
    };

    this.notifications.push(notification);
    this.logEvent(`Event emitted: ${type.toUpperCase()} notification - "${message}"`);

    // Auto-remove after 5 seconds (simulating real notification behavior)
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 5000);
  }

  /**
   * Handle event emitted from child component
   * This is called when child emits 'closed' event
   */
  removeNotification(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      this.notifications = this.notifications.filter(n => n.id !== id);
      this.logEvent(`Event received from child: notification ${id} closed`);
    }
  }

  private logEvent(event: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${event}`);

    if (this.eventLog.length > 50) {
      this.eventLog.pop();
    }
  }

  clearEventLog(): void {
    this.eventLog = [];
  }
}
