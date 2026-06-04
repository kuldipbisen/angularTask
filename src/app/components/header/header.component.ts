import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HEADER COMPONENT
 * 
 * Displays the main navigation header with branding, logo, and user authentication
 * Implements lifecycle hooks for logging
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = 'User';
  componentId = Math.random();

  constructor() {
    console.log(`[Header ${this.componentId}] Constructor called`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnInit(): void {
    console.log(`[Header ${this.componentId}] ngOnInit called`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  ngOnDestroy(): void {
    console.log(`[Header ${this.componentId}] ngOnDestroy called`, {
      timestamp: new Date().toLocaleTimeString()
    });
  }

  onUserLogin(): void {
    console.log(`[Header ${this.componentId}] User login button clicked`);
    this.isLoggedIn = true;
    this.userName = 'John Doe';
  }

  onUserLogout(): void {
    console.log(`[Header ${this.componentId}] User logout button clicked`);
    this.isLoggedIn = false;
    this.userName = 'User';
  }
}

