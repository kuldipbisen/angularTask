import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * Directive to highlight top-rated courses
 * If topRated is true, adds star icon and applies background color
 */
@Directive({
  selector: '[appHighlightRating]',
  standalone: true
})
export class HighlightRatingDirective implements OnInit {
  @Input() appHighlightRating!: boolean;
  @Input() highlightBackgroundColor: string = '#fff3cd'; // Light yellow

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlightRating) {
      // Add star icon
      const starIcon = '<span class="top-rated-star">★</span>';
      this.el.nativeElement.innerHTML = starIcon + ' ' + this.el.nativeElement.innerHTML;

      // Apply background color
      this.el.nativeElement.style.backgroundColor = this.highlightBackgroundColor;
      this.el.nativeElement.style.borderRadius = '8px';
      this.el.nativeElement.style.padding = '12px';
    }
  }
}
