import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 3;
  @Input() totalItems: number = 0;
  @Input() loading: boolean = false;

  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startItem(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get endItem(): number {
    const end = (this.currentPage + 1) * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 0;
  }

  get canGoNext(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.totalItems;
  }

  onPrevious(): void {
    if (this.canGoPrevious) {
      this.prevPage.emit();
    }
  }

  onNext(): void {
    if (this.canGoNext) {
      this.nextPage.emit();
    }
  }
}
