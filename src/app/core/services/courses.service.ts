import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ENVIRONMENT } from "../tokens/environment.token";
import { IEnvironment } from "@environments/environment.interface";
import {
  Course,
  CreateCourseRequest,
  CoursesApiResponse,
  PaginatedResponse,
  SearchParams,
  UpdateCourseRequest,
} from "../models";
import { CourseMapper } from "../mappers";
import {
  AppError,
  NotFoundError,
  ServerError,
  ValidationError,
  ErrorHandler,
} from "../errors";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: IEnvironment
  ) {}

  /**
   * Get all courses with pagination
   */
  getCourses(
    count?: number,
    offset?: number
  ): Observable<PaginatedResponse<Course>> {
    const pageSize = count || this.environment.pagination.defaultPageSize;
    const limitedPageSize = Math.min(
      pageSize,
      this.environment.pagination.maxPageSize
    );

    let params = new HttpParams()
      .set("count", limitedPageSize.toString())
      .set("offset", (offset || 0).toString());

    return this.http
      .get<CoursesApiResponse>(`${this.environment.apiUrl}/courses`, {
        params,
      })
      .pipe(
        map((response) => CourseMapper.mapApiListToDomain(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Search courses with pagination
   */
  searchCourses(params: SearchParams): Observable<PaginatedResponse<Course>> {
    const pageSize = params.count || this.environment.pagination.defaultPageSize;
    const limitedPageSize = Math.min(
      pageSize,
      this.environment.pagination.maxPageSize
    );

    let httpParams = new HttpParams()
      .set("count", limitedPageSize.toString())
      .set("offset", (params.offset || 0).toString());

    if (params.search) {
      httpParams = httpParams.set("search", params.search);
    }

    return this.http
      .get<CoursesApiResponse>(`${this.environment.apiUrl}/courses/search`, {
        params: httpParams,
      })
      .pipe(
        map((response) => CourseMapper.mapApiListToDomain(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Get course by ID
   */
  getCourseById(id: string): Observable<Course> {
    if (!id) {
      return throwError(() => new ValidationError("Course ID is required"));
    }

    return this.http
      .get<any>(`${this.environment.apiUrl}/courses/${id}`)
      .pipe(
        map((response) => CourseMapper.mapApiToDomain(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Create new course
   */
  createCourse(request: CreateCourseRequest): Observable<Course> {
    this.validateCreateRequest(request);

    return this.http
      .post<any>(`${this.environment.apiUrl}/courses`, request)
      .pipe(
        map((response) => CourseMapper.mapApiToDomain(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Update existing course
   */
  updateCourse(id: string, request: UpdateCourseRequest): Observable<Course> {
    if (!id) {
      return throwError(() => new ValidationError("Course ID is required"));
    }

    return this.http
      .put<any>(`${this.environment.apiUrl}/courses/${id}`, request)
      .pipe(
        map((response) => CourseMapper.mapApiToDomain(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Delete course
   */
  deleteCourse(id: string): Observable<void> {
    if (!id) {
      return throwError(() => new ValidationError("Course ID is required"));
    }

    return this.http
      .delete<void>(`${this.environment.apiUrl}/courses/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Validate create course request
   */
  private validateCreateRequest(request: CreateCourseRequest): void {
    const errors: Record<string, string> = {};

    if (!request.name) errors['name'] = 'Course name is required';
    if (!request.description)
      errors['description'] = 'Course description is required';
    if (request.price === undefined || request.price < 0)
      errors['price'] = 'Valid course price is required';
    if (!request.duration || request.duration <= 0)
      errors['duration'] = 'Valid course duration is required';
    if (!request.instructor) errors['instructor'] = 'Instructor name is required';
    if (!request.imageUrl) errors['imageUrl'] = 'Course image URL is required';

    if (Object.keys(errors).length > 0) {
      throw new ValidationError("Invalid course data", errors);
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse | unknown): Observable<never> {
    let appError: AppError;

    if (error instanceof HttpErrorResponse) {
      const status = error.status;
      const errorData = error.error || {};

      switch (status) {
        case 400:
          appError = new ValidationError(
            errorData.message || "Invalid request",
            errorData.details
          );
          break;
        case 404:
          appError = new NotFoundError(
            errorData.message || "Course not found"
          );
          break;
        case 409:
          appError = new AppError(
            errorData.message || "Course conflict",
            "CONFLICT_ERROR",
            409
          );
          break;
        case 500:
          appError = new ServerError(
            errorData.message || "Server error occurred"
          );
          break;
        default:
          appError = new AppError(
            errorData.message || "An error occurred",
            errorData.code || "UNKNOWN_ERROR",
            status
          );
      }
    } else {
      appError = ErrorHandler.handle(error);
    }

    return throwError(() => appError);
  }
}
