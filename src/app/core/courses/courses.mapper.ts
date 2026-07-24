/**
 * Data Mappers for Course transformation
 * Handles bidirectional conversion between API models and domain models
 * This is the single source of truth for data transformation logic
 */

import { APICourse, APIAuthor } from '@app/models/api.interface';
import { Course, DomainAuthor } from '@app/models/domain.interface';

/**
 * Type alias for consistency with API contracts
 */
export type ICourse = Course;

/**
 * Maps API Course to Domain Course
 * Handles all property name and type transformations:
 * - name → title
 * - date (string) → createdAt (Date)
 * - length → duration
 * - isTopRated → topRated
 * - authors array → instructor (primary author name) and authors
 *
 * @param apiCourse - Course data from API
 * @returns Domain Course model
 */
export const mapAPICourseToICourse = (apiCourse: APICourse): ICourse => {
  const instructor = apiCourse.authors && apiCourse.authors.length > 0
    ? `${apiCourse.authors[0].name} ${apiCourse.authors[0].lastName}`
    : apiCourse.instructor || 'Unknown';

  const domainAuthors: DomainAuthor[] = (apiCourse.authors || []).map(author => ({
    id: String(author.id),
    name: author.name,
    lastName: author.lastName,
    fullName: `${author.name} ${author.lastName}`
  }));

  return {
    id: String(apiCourse.id),
    title: apiCourse.title || 'Untitled Course',
    createdAt: new Date(apiCourse.date),
    duration: apiCourse.durationHours,
    description: apiCourse.description || 'No description',
    instructor,
    price: apiCourse.price || 0,
    students: apiCourse.students || 0,
    topRated: apiCourse.isTopRated,
    authors: domainAuthors,
    role: apiCourse.role,
    category: apiCourse.category
  };
};

/**
 * Maps Domain Course to API Course (for create/update operations)
 * Handles reverse property transformations:
 * - title → name
 * - createdAt (Date) → date (ISO string)
 * - duration → length
 * - topRated → isTopRated
 *
 * Note: This is typically used for sending data to the API
 * The API response structure is handled by mapAPICourseToICourse
 *
 * @param course - Partial domain course (for updates)
 * @returns Partial API course model suitable for API requests
 */
export const mapICourseToAPICourse = (
  course: Partial<ICourse>,
): Partial<APICourse> => {
  const mapped: Partial<APICourse> = {};

  if (course.id !== undefined) {
    mapped.id = Number(course.id);
  }

  if (course.title !== undefined) {
    mapped.title = course.title;
  }

  if (course.createdAt !== undefined) {
    mapped.date = course.createdAt instanceof Date
      ? course.createdAt.toISOString()
      : course.createdAt;
  }

  if (course.duration !== undefined) {
    mapped.durationHours = course.duration;
  }

  if (course.category !== undefined) {
    mapped.category = course.category;
  }

  if (course.description !== undefined) {
    mapped.description = course.description;
  }

  if (course.price !== undefined) {
    mapped.price = course.price;
  }

  if (course.instructor !== undefined) {
    mapped.instructor = course.instructor;
  }

  if (course.students !== undefined) {
    mapped.students = course.students;
  }

  if (course.role !== undefined) {
    mapped.role = course.role;
  }

  if (course.topRated !== undefined) {
    mapped.isTopRated = course.topRated;
  }

  if (course.authors !== undefined && course.authors.length > 0) {
    mapped.authors = course.authors.map(author => ({
      id: Number(author.id),
      name: author.name,
      lastName: author.lastName
    }));
  }

  return mapped;
};

/**
 * Maps array of API Courses to Domain Courses
 *
 * @param apiCourses - Array of courses from API
 * @returns Array of domain courses
 */
export const mapAPICoursesToICourses = (apiCourses: APICourse[]): ICourse[] => {
  return apiCourses.map(mapAPICourseToICourse);
};

/**
 * Maps array of Domain Courses to API Courses
 *
 * @param courses - Array of domain courses
 * @returns Array of API course models
 */
export const mapICoursesToAPICourses = (
  courses: Partial<ICourse>[],
): Partial<APICourse>[] => {
  return courses.map(mapICourseToAPICourse);
};
