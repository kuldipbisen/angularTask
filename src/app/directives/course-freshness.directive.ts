import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * Directive to highlight newly created courses
 * If course is less than 7 days old, applies a "new" badge style
 */
@Directive({
  selector: '[appCourseFreshness]',
  standalone: true
})
export class CourseFreshnessDirective implements OnInit {
  @Input() appCourseFreshness!: Date;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const courseDate = new Date(this.appCourseFreshness);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - courseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      this.el.nativeElement.classList.add('fresh-course');
      this.el.nativeElement.innerHTML += ' <span class="badge-new">NEW</span>';
    }
  }
}
