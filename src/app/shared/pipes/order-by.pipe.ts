import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course.model';

/**
 * Pipe to order courses by creation date
 * Default order: newest first (descending)
 * 
 * Usage:
 * {{ courses | appOrderBy }}
 * {{ courses | appOrderBy:true }} (ascending)
 * {{ courses | appOrderBy:false }} (descending)
 */
@Pipe({
  name: 'appOrderBy',
  standalone: true,
  pure: true
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Course[], ascending: boolean = false): Course[] {
    if (!courses || !Array.isArray(courses)) {
      return courses;
    }

    const sortedCourses = [...courses];
    sortedCourses.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();

      if (ascending) {
        return dateA - dateB; // Newest first ascending (older first)
      } else {
        return dateB - dateA; // Newest first descending
      }
    });

    return sortedCourses;
  }
}
