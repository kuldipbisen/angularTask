import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BreadcrumbsComponent, Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.component';
import { CourseListComponent, Course } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BreadcrumbsComponent, CourseListComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  courses: Course[] = [];

  ngOnInit() {
    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Courses' }
    ];

    this.courses = [
      {
        id: 1,
        title: 'Angular Basics',
        description: 'Learn the fundamentals of Angular framework',
        instructor: 'John Doe',
        duration: '4 weeks'
      },
      {
        id: 2,
        title: 'TypeScript Mastery',
        description: 'Master TypeScript for better code quality',
        instructor: 'Jane Smith',
        duration: '6 weeks'
      },
      {
        id: 3,
        title: 'Advanced Angular',
        description: 'Deep dive into advanced Angular concepts',
        instructor: 'Bob Johnson',
        duration: '8 weeks'
      }
    ];
  }
}
