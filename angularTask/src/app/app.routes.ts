import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent }
];
