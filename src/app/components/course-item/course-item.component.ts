import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../services/course.service';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course!: Course;
  @Output() delete = new EventEmitter<Course>();

  onDelete(): void {
    this.delete.emit(this.course);
  }
}
