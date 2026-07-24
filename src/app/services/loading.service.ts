import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() {}

  /**
   * Show the loading block
   */
  show(): void {
    this.isLoadingSubject.next(true);
  }

  /**
   * Hide the loading block
   */
  hide(): void {
    this.isLoadingSubject.next(false);
  }

  /**
   * Get the current loading state
   */
  isLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  /**
   * Toggle the loading state
   */
  toggle(): void {
    this.isLoadingSubject.next(!this.isLoadingSubject.value);
  }
}
