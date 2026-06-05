import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() control!: FormControl;
  @Input() errorMessage = '';
  @Input() minLength?: number;
}
