import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>About Us</h4>
          <p>Learn Angular directives and pipes with practical examples.</p>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contact</h4>
          <p>Email: info&#64;angular-demo.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Angular Directives & Pipes. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background: #333;
      color: #fff;
      margin-top: 4rem;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      padding: 2rem;
    }
    
    .footer-section h4 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: #667eea;
    }
    
    .footer-section p {
      margin: 0.5rem 0;
      color: #ccc;
      font-size: 0.9rem;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-section ul li {
      margin: 0.5rem 0;
    }
    
    .footer-section a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .footer-section a:hover {
      color: #667eea;
    }
    
    .footer-bottom {
      text-align: center;
      padding: 1.5rem;
      border-top: 1px solid #555;
      color: #999;
      font-size: 0.9rem;
    }
    
    .footer-bottom p {
      margin: 0;
    }
  `]
})
export class FooterComponent {}
