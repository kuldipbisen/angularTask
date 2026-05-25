import { Component } from '@angular/core';
import { CourseManagementComponent } from './components/course-management.component';

@Component({
  selector: 'app-root',
  imports: [CourseManagementComponent],
  template: `<app-course-management></app-course-management>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Course Management';
}
