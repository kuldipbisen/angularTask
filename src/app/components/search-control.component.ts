import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-control',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="search-control">
      <div class="search-input-wrapper">
        <input 
          type="text" 
          [(ngModel)]="searchQuery"
          (keyup.enter)="onSearch()"
          placeholder="Text to search"
          class="search-input">
        <button 
          (click)="onSearch()"
          class="btn-search">
          Search
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-control {
      flex: 1;
      display: flex;
    }
    
    .search-input-wrapper {
      display: flex;
      gap: 0;
      width: 100%;
    }
    
    .search-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 2px 0 0 2px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
      background: white;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #ddd;
    }
    
    .btn-search {
      padding: 0.75rem 1.5rem;
      background: #7cb342;
      color: white;
      border: none;
      border-radius: 0 2px 2px 0;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #689f38;
      }
    }
  `]
})
export class SearchControlComponent {
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  searchQuery: string = '';

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  onClear(): void {
    this.searchQuery = '';
    this.clear.emit();
  }
}
