import { Component } from '@angular/core';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';

@Component({
  selector: 'app-course-page',
  imports: [CoursesListComponent],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent {
}
