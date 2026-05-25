import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * COURSE ITEM COMPONENT
 * 
 * Displays individual course card
 * Handles course actions like view, edit, and delete
 */
export interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  level: string;
  students: number;
  rating: number;
  price: number;
}

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, OnDestroy {
  @Input() course!: Course;
  @Output() deleteCourse = new EventEmitter<number>();
  @Output() viewCourse = new EventEmitter<number>();
  @Output() editCourse = new EventEmitter<number>();

  constructor() {
    console.log('[CourseItem] Constructor called');
  }

  ngOnInit(): void {
    console.log('[CourseItem] ngOnInit called - Course item initialized:', this.course.title);
  }

  onDelete(): void {
    console.log('[CourseItem] Delete event - Course ID:', this.course.id, 'Title:', this.course.title);
    this.deleteCourse.emit(this.course.id);
  }

  onView(): void {
    console.log('[CourseItem] View event - Course ID:', this.course.id);
    this.viewCourse.emit(this.course.id);
  }

  onEdit(): void {
    console.log('[CourseItem] Edit event - Course ID:', this.course.id);
    this.editCourse.emit(this.course.id);
  }

  ngOnDestroy(): void {
    console.log('[CourseItem] ngOnDestroy called - Course item destroyed:', this.course.title);
  }
}
