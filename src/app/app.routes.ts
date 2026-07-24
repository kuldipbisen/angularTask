import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Courses' }
  },
  {
    path: 'courses/new',
    component: CourseDetailComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'New Course' }
  },
  {
    path: 'courses/:id',
    component: CourseDetailComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Edit Course' }
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  { path: '**', redirectTo: '/404' }
];
