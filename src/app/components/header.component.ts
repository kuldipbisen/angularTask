import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <span class="play-icon">▶</span>
          <h1>VIDEO COURSE</h1>
        </div>
        <nav class="nav-menu">
          <a href="#login">User login</a>
          <a href="#logout">Log off</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: #444;
      color: white;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .play-icon {
      color: #17a2b8;
      font-size: 1.5rem;
    }
    
    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    .nav-menu {
      display: flex;
      gap: 2rem;
    }
    
    .nav-menu a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      transition: opacity 0.3s;
    }
    
    .nav-menu a:hover {
      opacity: 0.7;
    }
  `]
})
export class HeaderComponent {}

