import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { AuthService, User } from './services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BreadcrumbsComponent, LoadingBlockComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'agmp-tests';
  currentUserName: string = '';
  currentUser: User | null = null;
  isAuthenticated: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(authState => {
        this.isAuthenticated = authState.isAuthenticated;
        this.currentUser = authState.user;
        if (authState.user) {
          this.currentUserName = `${authState.user.firstName} ${authState.user.lastName}`.trim();
        } else {
          this.currentUserName = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
