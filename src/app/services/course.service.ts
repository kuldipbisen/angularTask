import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  students: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular',
      instructor: 'John Doe',
      duration: 40,
      students: 150,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Master TypeScript advanced concepts',
      instructor: 'Jane Smith',
      duration: 35,
      students: 120,
      createdAt: new Date('2024-02-20')
    }
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);

  constructor() {}

  /**
   * Get all courses as an Observable
   */
  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  /**
   * Get a single course by ID
   */
  getCourseById(id: string): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  /**
   * Add a new course
   */
  addCourse(course: Omit<Course, 'id' | 'createdAt'>): Course {
    const newCourse: Course = {
      ...course,
      id: String(Math.max(...this.courses.map(c => Number(c.id)), 0) + 1),
      createdAt: new Date()
    };
    this.courses.push(newCourse);
    this.coursesSubject.next([...this.courses]);
    return newCourse;
  }

  /**
   * Update an existing course
   */
  updateCourse(id: string, updates: Partial<Course>): Course | undefined {
    const index = this.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...updates, id: this.courses[index].id };
      this.coursesSubject.next([...this.courses]);
      return this.courses[index];
    }
    return undefined;
  }

  /**
   * Delete a course by ID
   */
  deleteCourse(id: string): boolean {
    const index = this.courses.findIndex(course => course.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      this.coursesSubject.next([...this.courses]);
      return true;
    }
    return false;
  }

  /**
   * Search courses by title
   */
  searchCourses(query: string): Course[] {
    const lowerQuery = query.toLowerCase();
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery)
    );
  }
}
