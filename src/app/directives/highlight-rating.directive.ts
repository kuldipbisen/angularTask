import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * Directive to highlight courses based on rating
 * Rating >= 4.5: Gold background
 * Rating >= 4.0: Silver background
 * Rating < 4.0: Standard background
 */
@Directive({
  selector: '[appHighlightRating]',
  standalone: true
})
export class HighlightRatingDirective implements OnInit {
  @Input() appHighlightRating!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const rating = this.appHighlightRating;

    if (rating >= 4.5) {
      this.el.nativeElement.style.backgroundColor = '#ffd700';
      this.el.nativeElement.style.borderLeft = '5px solid #ff6b6b';
    } else if (rating >= 4.0) {
      this.el.nativeElement.style.backgroundColor = '#c0c0c0';
      this.el.nativeElement.style.borderLeft = '5px solid #4ecdc4';
    } else {
      this.el.nativeElement.style.borderLeft = '5px solid #95e1d3';
    }
    this.el.nativeElement.style.paddingLeft = '10px';
  }
}
