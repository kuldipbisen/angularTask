import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-item',
  imports: [],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course!: Course;
}
