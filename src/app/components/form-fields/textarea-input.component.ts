import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaInputComponent {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() control!: FormControl;
  @Input() errorMessage = '';
  @Input() rows = 4;
  @Input() minLength?: number;
}
