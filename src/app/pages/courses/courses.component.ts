import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

/**
 * COURSES PAGE
 * 
 * Main page component for displaying courses
 * Implements lifecycle hooks for logging
 */
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseListComponent, BreadcrumbsComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('Courses Page Initialized');
  }

  ngOnDestroy(): void {
    console.log('Courses Page Destroyed');
  }
}
