import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormButtonsComponent {
  @Input() isLoading = false;
  @Input() saveText = 'Save';
  @Input() cancelText = 'Cancel';
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
