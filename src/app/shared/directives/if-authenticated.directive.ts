import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

/**
 * Structural directive to conditionally display elements based on authentication status
 * Usage: *appIfAuthenticated
 * 
 * Features:
 * - Internal mock isAuthenticated$ observable with a boolean value
 * - Shows/hides the host element based on the isAuthenticated$ value
 * - No input parameters required
 * - Used as a structural directive with *ifAuthenticated syntax
 * - Mock value can be toggled for testing
 */
@Directive({
  selector: '[appIfAuthenticated]',
  standalone: true
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  /**
   * Internal mock isAuthenticated$ observable
   * Emits true by default to show authenticated elements
   */
  private isAuthenticated$ = new Subject<boolean>();
  private subscription: Subscription | null = null;
  private hasView: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes with initial value
    this.subscription = this.isAuthenticated$
      .pipe(startWith(true)) // Emit true immediately on subscription
      .subscribe((isAuthenticated) => {
        if (isAuthenticated && !this.hasView) {
          // Show element if authenticated and not already shown
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!isAuthenticated && this.hasView) {
          // Hide element if not authenticated and currently shown
          this.viewContainer.clear();
          this.hasView = false;
        }
      });

    // Emit initial authenticated state
    this.isAuthenticated$.next(true);
  }

  /**
   * Method to toggle authentication status (for testing purposes)
   * Can be called to test showing/hiding functionality
   */
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated$.next(isAuthenticated);
  }

  /**
   * Get the current authentication state
   */
  getAuthenticated(): boolean {
    return this.hasView;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isAuthenticated$.complete();
  }
}
