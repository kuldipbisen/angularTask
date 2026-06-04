import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CoursesComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <app-courses></app-courses>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Course Management Platform';
}
