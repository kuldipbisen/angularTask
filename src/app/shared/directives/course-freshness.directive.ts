import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * Directive to highlight course freshness and upcoming courses
 * - Fresh course (green border): created within the last 14 days
 * - Upcoming course (blue border): creation date is in the future
 */
@Directive({
  selector: '[appCourseFreshness]',
  standalone: true
})
export class CourseFreshnessDirective implements OnInit {
  @Input() appCourseFreshness!: Date;
  @Input() freshBorderColor: string = '3px solid #4CAF50'; // Green
  @Input() upcomingBorderColor: string = '3px solid #2196F3'; // Blue

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const courseDate = new Date(this.appCourseFreshness);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const courseDateNormalized = new Date(courseDate);
    courseDateNormalized.setHours(0, 0, 0, 0);

    // Check if course date is in the future (upcoming)
    if (courseDateNormalized > today) {
      this.el.nativeElement.style.border = this.upcomingBorderColor;
    } else {
      // Check if course is within 14 days (fresh)
      const diffTime = today.getTime() - courseDateNormalized.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 14) {
        this.el.nativeElement.style.border = this.freshBorderColor;
      }
    }
  }
}
