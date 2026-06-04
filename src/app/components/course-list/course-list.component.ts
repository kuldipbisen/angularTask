import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Course {
  id: number;
  title: string;
  description: string;
  creationDate?: Date;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<number>();
  @Output() addCourse = new EventEmitter<void>();
  @Output() loadMore = new EventEmitter<void>();
  
  searchQuery: string = '';
  displayedCourses: Course[] = [];
  itemsPerPage = 3;
  currentPage = 1;

  ngOnInit() {
    this.updateDisplayedCourses();
  }

  ngOnChanges() {
    this.updateDisplayedCourses();
  }

  updateDisplayedCourses() {
    let filtered = this.courses;
    if (this.searchQuery.trim()) {
      filtered = this.courses.filter(course =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.displayedCourses = filtered.slice(0, this.itemsPerPage * this.currentPage);
  }

  onSearch() {
    this.currentPage = 1;
    this.updateDisplayedCourses();
  }

  onLoadMore() {
    this.currentPage++;
    this.updateDisplayedCourses();
    this.loadMore.emit();
  }

  onEdit(course: Course) {
    this.editCourse.emit(course);
  }

  onDelete(id: number) {
    this.deleteCourse.emit(id);
  }

  onAddCourse() {
    this.addCourse.emit();
  }

  hasMoreCourses(): boolean {
    const filteredCourses = this.searchQuery.trim() 
      ? this.courses.filter(course =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : this.courses;
    return this.displayedCourses.length < filteredCourses.length;
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
