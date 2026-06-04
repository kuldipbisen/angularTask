import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  id: number;
  title: string;
  duration: string;
  date: string;
  description: string;
}

/**
 * COURSE ITEM COMPONENT
 * 
 * Displays individual course information with edit and delete buttons
 * Emits events to parent component
 * Demonstrates lifecycle hooks: constructor, ngOnChanges, ngOnInit, AfterViewInit, ngOnDestroy
 */
@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() course!: Course;
  @Output() editItemEvent = new EventEmitter<Course>();
  @Output() deleteItemEvent = new EventEmitter<number>();
  
  componentId = Math.random();

  constructor() {
    console.log(`[CourseItem ${this.componentId}] Constructor called - component created`, {
      courseExists: !!this.course,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`[CourseItem ${this.componentId}] ngOnChanges called`, {
      changes: Object.keys(changes),
      courseId: this.course?.id,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnInit(): void {
    console.log(`[CourseItem ${this.componentId}] ngOnInit called - component initialized`, {
      courseId: this.course?.id,
      courseTitle: this.course?.title,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngAfterViewInit(): void {
    console.log(`[CourseItem ${this.componentId}] ngAfterViewInit called - view initialized`, {
      courseId: this.course?.id,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnDestroy(): void {
    console.log(`[CourseItem ${this.componentId}] ngOnDestroy called - component destroyed`, {
      courseId: this.course?.id,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  handleEditClick(course: Course): void {
    console.log(`[CourseItem ${this.componentId}] handleEditClick called:`, {
      courseId: course.id,
      courseTitle: course.title
    });
    this.editItemEvent.emit(course);
  }

  handleDeleteClick(courseId: number): void {
    console.log(`[CourseItem ${this.componentId}] handleDeleteClick called for courseId:`, courseId);
    this.deleteItemEvent.emit(courseId);
  }
}
