import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CourseListComponent, Course } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CourseListComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        title: 'Angular Basics',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college classes.',
        creationDate: new Date('2024-05-15')
      },
      {
        id: 2,
        title: 'TypeScript Mastery',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college classes.',
        creationDate: new Date('2024-05-10')
      },
      {
        id: 3,
        title: 'Advanced Angular',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college classes.',
        creationDate: new Date('2024-05-08')
      },
      {
        id: 4,
        title: 'React Fundamentals',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college classes.',
        creationDate: new Date('2024-05-01')
      },
      {
        id: 5,
        title: 'Vue.js Deep Dive',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college classes.',
        creationDate: new Date('2024-04-28')
      },
      {
        id: 6,
        title: 'Node.js Backend Development',
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college classes.',
        creationDate: new Date('2024-04-20')
      }
    ];
  }

  onEditCourse(course: Course) {
    console.log('Edit course:', course);
  }

  onDeleteCourse(id: number) {
    console.log('Delete course:', id);
    this.courses = this.courses.filter(c => c.id !== id);
  }

  onAddCourse() {
    console.log('Add new course');
  }

  onLoadMore() {
    console.log('Load more courses');
  }
}
