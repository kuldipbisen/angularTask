import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseItemComponent } from '../course-item/course-item.component';

@Component({
  selector: 'app-courses-list',
  imports: [CommonModule, CourseItemComponent],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    // Mock data for courses
    this.courses = [
      {
        id: 1,
        title: 'Angular Fundamentals',
        description: 'Learn the basics of Angular framework including components, services, and dependency injection.',
        instructor: 'John Doe',
        duration: 40,
        rating: 4.8
      },
      {
        id: 2,
        title: 'Advanced Angular Patterns',
        description: 'Master advanced Angular patterns including change detection strategies, performance optimization, and RxJS.',
        instructor: 'Jane Smith',
        duration: 35,
        rating: 4.9
      },
      {
        id: 3,
        title: 'Angular Testing',
        description: 'Write unit and integration tests for Angular applications using Jest and Jasmine.',
        instructor: 'Mike Johnson',
        duration: 25,
        rating: 4.7
      },
      {
        id: 4,
        title: 'Angular Performance Tuning',
        description: 'Optimize your Angular applications for production with lazy loading, tree shaking, and AOT compilation.',
        instructor: 'Sarah Williams',
        duration: 20,
        rating: 4.6
      }
    ];
  }
}
