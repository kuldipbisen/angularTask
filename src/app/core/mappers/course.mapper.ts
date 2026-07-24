import { Course, CourseApiModel, CoursesApiResponse, PaginatedResponse } from '../models';

export class CourseMapper {
  static mapApiToDomain(apiCourse: CourseApiModel): Course {
    return {
      id: apiCourse.id,
      name: apiCourse.name,
      description: apiCourse.description,
      price: apiCourse.price,
      duration: apiCourse.duration,
      instructor: apiCourse.instructor,
      rating: apiCourse.rating,
      imageUrl: apiCourse.imageUrl,
      createdDate: new Date(apiCourse.createdAt),
      updatedDate: new Date(apiCourse.updatedAt),
    };
  }

  static mapApiListToDomain(apiResponse: CoursesApiResponse): PaginatedResponse<Course> {
    return {
      data: apiResponse.data.map(course => this.mapApiToDomain(course)),
      total: apiResponse.total,
      offset: apiResponse.offset,
      count: apiResponse.count,
    };
  }

  static mapDomainToApi(course: Course): CourseApiModel {
    return {
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price,
      duration: course.duration,
      instructor: course.instructor,
      rating: course.rating,
      imageUrl: course.imageUrl,
      createdAt: course.createdDate.toISOString(),
      updatedAt: course.updatedDate.toISOString(),
    };
  }
}
