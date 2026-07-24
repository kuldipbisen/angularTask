import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_URL, ENVIRONMENT } from '@app/core/tokens';
import { IEnvironment } from '@environments/environment.interface';
import { APICourse, APIPaginatedResponse } from '@app/models/api.interface';
import { mapAPICourseToICourse, mapICourseToAPICourse, type ICourse } from '@app/core/courses';
import { PaginatedResponse } from '@app/models/domain.interface';
import { LoadingService } from './loading.service';

export type Course = ICourse;

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private paginationStateSubject = new BehaviorSubject<{
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }>({
    page: 1,
    pageSize: 3,
    total: 0,
    totalPages: 0
  });

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    @Inject(ENVIRONMENT) private environment: IEnvironment,
    private loadingService: LoadingService
  ) {}

  /**
   * Get courses observable for current state
   */
  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  /**
   * Get pagination state
   */
  getPaginationState(): Observable<any> {
    return this.paginationStateSubject.asObservable();
  }

  /**
   * Fetch paginated courses from backend
   * @param page - Page number (1-indexed, defaults to 1)
   * @param pageSize - Items per page (defaults to environment defaultPageSize)
   * @returns Observable of paginated courses
   */
  getCoursesWithPagination(
    page: number = 1,
    pageSize?: number
  ): Observable<Course[]> {
    // Use environment's defaultPageSize if not provided
    const size = pageSize || this.environment.pagination.defaultPageSize;
    
    // Build query parameters - mock server uses 'offset' and 'count'
    const offset = (page - 1) * size;
    let params = new HttpParams()
      .set('offset', String(offset))
      .set('count', String(size));

    console.log('Fetching courses - Page:', page, 'Size:', size);
    this.loadingService.show();

    return this.http.get<any>(
      `${this.apiUrl}/courses`,
      { params }
    ).pipe(
      map(response => {
        console.log('API Response - Total:', response.total, 'Received:', response.data?.length || 0, 'courses');
        // Transform API response to domain models
        const apiCourses = response.data || [];
        const domainCourses = apiCourses.map((course: any) => {
          // Map mock server course format to ICourse format
          return {
            id: course.id,
            title: course.name,
            description: course.description,
            instructor: course.instructor,
            duration: course.duration,
            createdAt: new Date(course.createdAt),
            price: course.price,
            rating: course.rating,
            imageUrl: course.imageUrl,
            students: course.students || 0
          };
        });

        // Update pagination state
        this.paginationStateSubject.next({
          page,
          pageSize: size,
          total: response.total || 0,
          totalPages: Math.ceil((response.total || 0) / size)
        });

        // Update courses subject
        if (page === 1) {
          this.coursesSubject.next(domainCourses);
        } else {
          // For subsequent pages, append to existing courses
          this.coursesSubject.next([...this.coursesSubject.value, ...domainCourses]);
        }

        return domainCourses;
      }),
      catchError(error => {
        console.error('Failed to fetch courses:', error);
        throw error;
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * Load next page of courses
   */
  loadMoreCourses(): Observable<Course[]> {
    const currentState = this.paginationStateSubject.value;
    const nextPage = currentState.page + 1;

    return this.getCoursesWithPagination(nextPage, currentState.pageSize);
  }

  /**
   * Reset and load first page of courses
   */
  resetAndLoadCourses(): Observable<Course[]> {
    this.coursesSubject.next([]);
    this.paginationStateSubject.next({
      page: 1,
      pageSize: this.environment.pagination.defaultPageSize,
      total: 0,
      totalPages: 0
    });

    return this.getCoursesWithPagination(1);
  }

  /**
   * Get a single course by ID from backend
   * @param id - Course ID
   */
  getCourseById(id: string): Observable<Course> {
    return this.http.get<APICourse>(`${this.apiUrl}/courses/${id}`).pipe(
      map(mapAPICourseToICourse),
      catchError(error => {
        console.error('Failed to fetch course:', error);
        throw error;
      })
    );
  }

  /**
   * Create a new course on backend
   * @param course - Partial course data (without id and createdAt)
   */
  addCourse(course: Partial<Course>): Observable<Course> {
    const apiCourse = mapICourseToAPICourse(course);
    this.loadingService.show();

    return this.http.post<APICourse>(`${this.apiUrl}/courses`, apiCourse).pipe(
      map(mapAPICourseToICourse),
      tap(() => {
        // Clear courses cache to force refresh when component reloads
        this.coursesSubject.next([]);
      }),
      catchError(error => {
        console.error('Failed to create course:', error);
        throw error;
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * Update an existing course on backend using PATCH
   * @param id - Course ID
   * @param updates - Partial course updates
   */
  updateCourse(id: string, updates: Partial<Course>): Observable<Course> {
    const apiCourse = mapICourseToAPICourse({ ...updates, id });
    this.loadingService.show();

    return this.http.patch<APICourse>(`${this.apiUrl}/courses/${id}`, apiCourse).pipe(
      map(mapAPICourseToICourse),
      tap(() => {
        // Clear courses cache to force refresh when component reloads
        this.coursesSubject.next([]);
      }),
      catchError(error => {
        console.error('Failed to update course:', error);
        throw error;
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * Delete a course from backend
   * @param id - Course ID to delete
   */
  deleteCourse(id: string): Observable<void> {
    this.loadingService.show();
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`).pipe(
      tap(() => {
        // Clear courses cache to force refresh when component reloads
        this.coursesSubject.next([]);
      }),
      catchError(error => {
        console.error('Failed to delete course:', error);
        throw error;
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * Search courses using dedicated /search endpoint
   * @param query - Search query text
   * @returns Observable of search results
   */
  searchCourses(query: string): Observable<Course[]> {
    console.log('Calling /search endpoint with query:', query);
    this.loadingService.show();
    
    return this.http.get<any>(`${this.apiUrl}/courses/search`, {
      params: new HttpParams().set('search', query)
    }).pipe(
      map(response => {
        console.log('Search results received:', response.data?.length || 0, 'courses');
        const apiCourses = response.data || [];
        const domainCourses = apiCourses.map((course: any) => {
          // Map mock server course format to ICourse format
          return {
            id: course.id,
            title: course.name,
            description: course.description,
            instructor: course.instructor,
            duration: course.duration,
            createdAt: new Date(course.createdAt),
            price: course.price,
            rating: course.rating,
            imageUrl: course.imageUrl,
            students: course.students || 0
          };
        });
        
        // Update courses subject with search results
        this.coursesSubject.next(domainCourses);
        
        // Update pagination state for search results
        this.paginationStateSubject.next({
          page: 1,
          pageSize: domainCourses.length,
          total: response.total || domainCourses.length,
          totalPages: 1
        });
        
        return domainCourses;
      }),
      catchError(error => {
        console.error('Search failed:', error);
        throw error;
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * Check if there are more courses to load
   * @returns boolean indicating if load more button should be shown
   */
  hasMoreCourses(): boolean {
    const state = this.paginationStateSubject.value;
    const remainingItems = state.total - (state.page * state.pageSize);
    return remainingItems > 0;
  }
}
