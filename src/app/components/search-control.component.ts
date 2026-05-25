import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * SEARCH CONTROL COMPONENT
 * 
 * Provides search functionality for filtering courses
 * Emits search query changes to parent component
 */
@Component({
  selector: 'app-search-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss']
})
export class SearchControlComponent implements OnInit, OnDestroy {
  @Output() searchQuery = new EventEmitter<string>();

  searchText: string = '';
  placeholder: string = 'Search courses by name or instructor...';

  constructor() {
    console.log('[SearchControl] Constructor called');
  }

  ngOnInit(): void {
    console.log('[SearchControl] ngOnInit called - Component initialized');
  }

  onSearchChange(query: string): void {
    console.log('[SearchControl] Search query changed:', query);
    this.searchQuery.emit(query);
  }

  clearSearch(): void {
    console.log('[SearchControl] Search cleared');
    this.searchText = '';
    this.searchQuery.emit('');
  }

  ngOnDestroy(): void {
    console.log('[SearchControl] ngOnDestroy called - Component destroyed');
  }
}
