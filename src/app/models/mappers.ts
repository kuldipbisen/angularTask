/**
 * Mappers for transforming API models to domain models
 * Handles the conversion between external API contracts and internal domain models
 */

import { APICourse, APIAuthor, APIPaginatedResponse } from './api.interface';
import { Course, DomainAuthor, PaginatedResponse } from './domain.interface';

/**
 * Transform API Author to Domain Author
 */
export function mapAPIAuthorToDomain(apiAuthor: APIAuthor): DomainAuthor {
  return {
    id: String(apiAuthor.id),
    name: apiAuthor.name,
    lastName: apiAuthor.lastName,
    fullName: `${apiAuthor.name} ${apiAuthor.lastName}`
  };
}

/**
 * Transform API Course to Domain Course
 * Handles property name differences and type conversions
 */
export function mapAPICourseToDomain(apiCourse: APICourse, instructorName?: string): Course {
  const authors = apiCourse.authors.map(mapAPIAuthorToDomain);
  const primaryInstructor = instructorName || 
    (authors.length > 0 ? authors[0].fullName : 'Unknown');

  return {
    id: String(apiCourse.id),
    title: apiCourse.name, // API 'name' -> domain 'title'
    description: apiCourse.description,
    instructor: primaryInstructor, // Derived from authors or provided
    duration: apiCourse.length, // API 'length' -> domain 'duration'
    students: 0, // Default value, would come from separate API call if available
    createdAt: new Date(apiCourse.date), // Convert string to Date
    topRated: apiCourse.isTopRated, // API 'isTopRated' -> domain 'topRated'
    authors: authors
  };
}

/**
 * Transform array of API Courses to Domain Courses
 */
export function mapAPICoursesToDomain(apiCourses: APICourse[]): Course[] {
  return apiCourses.map(course => mapAPICourseToDomain(course));
}

/**
 * Transform API paginated response to domain paginated response
 */
export function mapAPIPaginatedResponseToDomain<T, U>(
  apiResponse: APIPaginatedResponse<T>,
  mapItem: (item: T) => U
): PaginatedResponse<U> {
  return {
    data: apiResponse.content.map(mapItem),
    page: apiResponse.page,
    pageSize: apiResponse.pageSize,
    total: apiResponse.totalLength,
    totalPages: Math.ceil(apiResponse.totalLength / apiResponse.pageSize)
  };
}

/**
 * Specialized mapper for paginated course responses
 */
export function mapAPIPaginatedCoursesToDomain(
  apiResponse: APIPaginatedResponse<APICourse>
): PaginatedResponse<Course> {
  return mapAPIPaginatedResponseToDomain(apiResponse, mapAPICourseToDomain);
}
