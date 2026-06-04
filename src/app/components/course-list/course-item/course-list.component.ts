import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * COURSE LIST COMPONENT
 * 
 * Displays a list of available courses
 * Implements lifecycle hooks for logging
 */
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses = [
    { id: 1, title: 'Angular Basics', description: 'Learn the fundamentals of Angular' },
    { id: 2, title: 'Component Communication', description: 'Master component interaction patterns' },
    { id: 3, title: 'Lifecycle Hooks', description: 'Understand Angular lifecycle' }
  ];

  ngOnInit(): void {
    console.log('Course List Component Initialized');
  }

  ngOnDestroy(): void {
    console.log('Course List Component Destroyed');
  }
}
