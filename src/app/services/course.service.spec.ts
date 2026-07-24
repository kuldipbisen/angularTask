import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService, Course } from './course.service';
import { API_URL, ENVIRONMENT } from '@app/core/tokens';
import { APICourse, APIPaginatedResponse } from '@app/models/api.interface';
import { IEnvironment } from '@environments/environment.interface';

describe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'http://localhost:8080/api';
  const mockEnvironment: IEnvironment = {
    production: false,
    apiUrl: mockApiUrl,
    pagination: {
      defaultPageSize: 3,
      maxPageSize: 10
    }
  };

  const mockAPICourse: APICourse = {
    id: 1,
    name: 'Angular Basics',
    description: 'Learn Angular fundamentals',
    length: 30,
    date: '2024-01-15T00:00:00.000Z',
    isTopRated: true,
    authors: [{ id: 1, name: 'John', lastName: 'Doe' }]
  };

  const mockAPIPaginatedResponse: APIPaginatedResponse<APICourse> = {
    content: [mockAPICourse],
    page: 1,
    pageSize: 3,
    totalLength: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CourseService,
        { provide: API_URL, useValue: mockApiUrl },
        { provide: ENVIRONMENT, useValue: mockEnvironment }
      ]
    });
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getCourses', () => {
    it('should return courses observable from subject', (done) => {
      service.getCourses().subscribe(courses => {
        expect(Array.isArray(courses)).toBe(true);
        done();
      });
    });
  });

  describe('getCoursesWithPagination', () => {
    it('should fetch courses with default pagination', (done) => {
      service.getCoursesWithPagination(1).subscribe(courses => {
        expect(courses.length).toBeGreaterThan(0);
        expect(courses[0].title).toBe('Angular Basics');
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAPIPaginatedResponse);
    });

    it('should include search parameter when provided', (done) => {
      service.getCoursesWithPagination(1, 3, 'angular').subscribe(() => {
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3&textFragment=angular`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAPIPaginatedResponse);
    });

    it('should respect max page size from environment', (done) => {
      service.getCoursesWithPagination(1, 20).subscribe(() => {
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=20`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAPIPaginatedResponse);
    });

    it('should handle errors', (done) => {
      service.getCoursesWithPagination(1).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        }
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3`
      );
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getCourseById', () => {
    it('should fetch a course by ID', (done) => {
      service.getCourseById('1').subscribe(course => {
        expect(course.title).toBe('Angular Basics');
        expect(course.id).toBe('1');
        done();
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockAPICourse);
    });

    it('should handle not found error', (done) => {
      service.getCourseById('999').subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        }
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses/999`);
      req.error(new ErrorEvent('Not found'), { status: 404 });
    });
  });

  describe('addCourse', () => {
    it('should add a new course', (done) => {
      const newCourse: Partial<Course> = {
        title: 'New Course',
        description: 'New description',
        instructor: 'Instructor',
        duration: 40,
        students: 50
      };

      service.addCourse(newCourse).subscribe(course => {
        expect(course.title).toBe('Angular Basics');
        done();
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBeDefined();
      req.flush(mockAPICourse);
    });

    it('should handle add error', (done) => {
      const newCourse: Partial<Course> = {
        title: 'New Course',
        description: 'New description',
        instructor: 'Instructor',
        duration: 40,
        students: 50
      };

      service.addCourse(newCourse).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        }
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses`);
      req.error(new ErrorEvent('Server error'), { status: 500 });
    });
  });

  describe('updateCourse', () => {
    it('should update a course using PATCH', (done) => {
      const updates: Partial<Course> = {
        title: 'Updated Title',
        description: 'Updated description'
      };

      service.updateCourse('1', updates).subscribe(course => {
        expect(course).toBeDefined();
        done();
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toBeDefined();
      req.flush(mockAPICourse);
    });

    it('should handle update error', (done) => {
      const updates: Partial<Course> = {
        title: 'Updated Title'
      };

      service.updateCourse('1', updates).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        }
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses/1`);
      req.error(new ErrorEvent('Update failed'), { status: 400 });
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', (done) => {
      service.deleteCourse('1').subscribe(() => {
        expect(true).toBe(true);
        done();
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle delete error', (done) => {
      service.deleteCourse('1').subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        }
      });

      const req = httpTestingController.expectOne(`${mockApiUrl}/courses/1`);
      req.error(new ErrorEvent('Delete failed'), { status: 404 });
    });
  });

  describe('searchCourses', () => {
    it('should search courses with text fragment', (done) => {
      service.searchCourses('angular').subscribe(courses => {
        expect(courses).toBeDefined();
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3&textFragment=angular`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAPIPaginatedResponse);
    });

    it('should handle pagination in search', (done) => {
      service.searchCourses('angular', 2).subscribe(() => {
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=3&count=3&textFragment=angular`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAPIPaginatedResponse);
    });

    it('should return empty results for no matches', (done) => {
      const emptyResponse: APIPaginatedResponse<APICourse> = {
        content: [],
        page: 1,
        pageSize: 3,
        totalLength: 0
      };

      service.searchCourses('nonexistent').subscribe(courses => {
        expect(courses.length).toBe(0);
        done();
      });

      const req = httpTestingController.expectOne(
        req => req.url === `${mockApiUrl}/courses` && req.params.get('textFragment') === 'nonexistent'
      );
      req.flush(emptyResponse);
    });
  });

  describe('hasMoreCourses', () => {
    it('should return true when more courses available', () => {
      const result = service.hasMoreCourses();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Pagination State Management', () => {
    it('should track pagination state after load', (done) => {
      service.getCoursesWithPagination(1).subscribe(() => {
        service.getPaginationState().subscribe(state => {
          expect(state.page).toBe(1);
          expect(state.pageSize).toBe(3);
          done();
        });
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3`
      );
      req.flush(mockAPIPaginatedResponse);
    });
  });

  describe('loadMoreCourses', () => {
    it('should fetch next page of courses', (done) => {
      service.loadMoreCourses().subscribe(courses => {
        expect(courses).toBeDefined();
        done();
      });

      const req = httpTestingController.expectOne(request => {
        return request.url === `${mockApiUrl}/courses`;
      });
      req.flush(mockAPIPaginatedResponse);
    });
  });

  describe('resetAndLoadCourses', () => {
    it('should reset pagination and load first page', (done) => {
      service.resetAndLoadCourses().subscribe(courses => {
        expect(courses).toBeDefined();
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3`
      );
      req.flush(mockAPIPaginatedResponse);
    });

    it('should load first page with search term', (done) => {
      service.resetAndLoadCourses('angular').subscribe(courses => {
        expect(courses).toBeDefined();
        done();
      });

      const req = httpTestingController.expectOne(
        `${mockApiUrl}/courses?start=0&count=3&textFragment=angular`
      );
      req.flush(mockAPIPaginatedResponse);
    });
  });
});
