import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
}
