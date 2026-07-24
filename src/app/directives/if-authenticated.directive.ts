import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

/**
 * Directive to conditionally display elements based on authentication status
 * Usage: *appIfAuthenticated="isUserAuthenticated"
 */
@Directive({
  selector: '[appIfAuthenticated]',
  standalone: true
})
export class IfAuthenticatedDirective implements OnInit {
  private isAuthenticated = false;

  @Input()
  set appIfAuthenticated(isAuth: boolean) {
    this.isAuthenticated = isAuth;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    if (this.isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
