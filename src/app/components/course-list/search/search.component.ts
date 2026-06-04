import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * SEARCH COMPONENT
 * 
 * Provides search input and add course button
 * Emits search value to parent component
 * Demonstrates lifecycle hooks: constructor, ngOnInit, ngOnDestroy
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchValue = '';
  @Output() search = new EventEmitter<string>();
  @Output() addCourse = new EventEmitter<void>();
  componentId = Math.random();

  constructor() {
    console.log(`[Search ${this.componentId}] Constructor called - component created`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnInit(): void {
    console.log(`[Search ${this.componentId}] ngOnInit called - component initialized`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnDestroy(): void {
    console.log(`[Search ${this.componentId}] ngOnDestroy called - component destroyed`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  onSearch(): void {
    console.log(`[Search ${this.componentId}] Search query:`, this.searchValue);
    this.search.emit(this.searchValue);
  }

  onCourseAdd(): void {
    console.log(`[Search ${this.componentId}] Add course button clicked`);
    this.addCourse.emit();
  }
}
