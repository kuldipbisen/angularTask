import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ADD COURSE COMPONENT
 * 
 * Simple button to trigger add course action
 */
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  @Output() addCourse = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('Add Course Component Initialized');
  }

  ngOnDestroy(): void {
    console.log('Add Course Component Destroyed');
  }

  onCourseAdd(): void {
    console.log('Add course clicked');
    this.addCourse.emit();
  }
}
