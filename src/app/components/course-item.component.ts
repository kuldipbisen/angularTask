import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../models/course.model';
import { DurationPipe } from '../shared/pipes/duration.pipe';
import { CourseFreshnessDirective } from '../shared/directives/course-freshness.directive';
import { HighlightRatingDirective } from '../shared/directives/highlight-rating.directive';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [CommonModule, DurationPipe, CourseFreshnessDirective, HighlightRatingDirective],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss'
})
export class CourseItemComponent {
  @Input() course!: Course;
  @Output() delete = new EventEmitter<number>();
  @Output() enroll = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.course.id);
  }

  onEnroll(): void {
    this.enroll.emit(this.course.id);
  }

  getStars(): string {
    const fullStars = Math.floor(this.course.rating);
    const hasHalfStar = this.course.rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    stars += '☆'.repeat(5 - Math.ceil(this.course.rating));
    return stars;
  }
}
