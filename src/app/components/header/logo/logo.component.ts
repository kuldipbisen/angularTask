import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * LOGO COMPONENT
 * 
 * Displays the application logo and branding
 * Implements lifecycle hooks for logging
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit, OnDestroy {
  logoText = 'Course Management';
  logoAlt = 'Application Logo';

  ngOnInit(): void {
    console.log('Logo Component Initialized');
  }

  ngOnDestroy(): void {
    console.log('Logo Component Destroyed');
  }
}
