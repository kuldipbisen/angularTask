import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course.model';

/**
 * Pipe to filter courses by name
 * 
 * Usage:
 * {{ courses | appFilter:searchTerm }}
 * 
 * Note about pure property:
 * - pure: true (default) - Angular calls the pipe only when it detects a pure change
 *   to the input value. Pure means the input value is a primitive or object reference doesn't change
 *   DISADVANTAGE: Won't detect changes in the array contents if the reference stays the same
 * - pure: false (impure) - Angular calls the pipe every time it detects any change
 *   ADVANTAGE: Detects changes in the array contents even if reference stays the same
 *   DISADVANTAGE: Performance impact due to frequent pipe execution
 * 
 * For filtering lists where the searchTerm might change frequently, impure = true is recommended
 */
@Pipe({
  name: 'appFilter',
  standalone: true,
  pure: false // Set to true to see the difference - demonstrates impure behavior
})
export class FilterPipe implements PipeTransform {
  transform(courses: Course[], searchTerm: string): Course[] {
    if (!courses || !Array.isArray(courses)) {
      return courses;
    }

    if (!searchTerm || searchTerm.trim() === '') {
      return courses;
    }

    const term = searchTerm.toLowerCase().trim();
    return courses.filter((course) =>
      course.name.toLowerCase().includes(term)
    );
  }
}
