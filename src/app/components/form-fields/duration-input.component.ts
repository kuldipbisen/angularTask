import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MinutesToDurationPipe } from '../../pipes/minutes-to-duration.pipe';

@Component({
  selector: 'app-duration-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MinutesToDurationPipe],
  templateUrl: './duration-input.component.html',
  styleUrl: './duration-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationInputComponent {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() control!: FormControl;
  @Input() errorMessage = '';
  @Input() unit = 'minutes';
  @Input() minValue = 1;
  @Input() maxValue = 500;
}
