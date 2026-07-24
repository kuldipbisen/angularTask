import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @Input() isLoginMode: boolean = true;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() name: string = '';

  @Output() emailChange = new EventEmitter<string>();
  @Output() passwordChange = new EventEmitter<string>();
  @Output() nameChange = new EventEmitter<string>();
  @Output() login = new EventEmitter<void>();
  @Output() register = new EventEmitter<void>();
  @Output() toggleMode = new EventEmitter<void>();

  onEmailChange(value: string): void {
    this.emailChange.emit(value);
  }

  onPasswordChange(value: string): void {
    this.passwordChange.emit(value);
  }

  onNameChange(value: string): void {
    this.nameChange.emit(value);
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.login.emit();
    } else {
      this.register.emit();
    }
  }

  onToggleMode(): void {
    this.toggleMode.emit();
  }
}
