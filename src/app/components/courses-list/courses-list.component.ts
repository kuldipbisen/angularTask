import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../core/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() searchQuery: string = '';

  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

  private colors = [
    '#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b',
    '#38f9d7', '#fa709a', '#30cfd0', '#a8edea', '#ff9a56',
    '#feca57', '#48dbfb', '#ff6348', '#1dd1a1', '#5f27cd'
  ];

  private emojis = [
    '📐', '🔷', '⚡', '🔒', '🐍',
    '⚛️', '🟩', '⚙️', '📡', '🤖',
    '☁️', '🏗️', '📱', '💚', '✅'
  ];

  constructor(private sanitizer: DomSanitizer) {}

  onSearchQueryChange(value: string): void {
    this.searchQueryChange.emit(value);
  }

  onSearch(): void {
    this.search.emit();
  }

  onSearchEnter(): void {
    this.search.emit();
  }

  getBackgroundColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  getEmojiForCourse(index: number): string {
    return this.emojis[index % this.emojis.length];
  }

  getSvgImage(courseName: string, index: number): SafeUrl {
    const color = this.getBackgroundColor(index);
    const emoji = this.getEmojiForCourse(index);
    
    // Create SVG with better text handling and fallback shape
    const svgString = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${this.lightenColor(color, 30)};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#grad${index})"/>
        <g>
          <text x="200" y="130" font-size="80" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.9)">${emoji}</text>
        </g>
        <g>
          <text x="200" y="240" font-size="22" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif" dominant-baseline="middle">${courseName.replace(/&/g, '&amp;').substring(0, 18)}</text>
        </g>
      </svg>
    `;

    // Use Base64 encoding for better Unicode/emoji support
    const base64Svg = btoa(unescape(encodeURIComponent(svgString)));
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }
}
