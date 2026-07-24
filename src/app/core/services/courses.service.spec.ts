import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { ENVIRONMENT } from '../tokens/environment.token';
import { IEnvironment } from '@environments/environment.interface';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
  CoursesApiResponse,
} from '../models';
import { ValidationError, NotFoundError } from '../errors';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;
  const mockEnvironment: IEnvironment = {
    production: false,
    apiUrl: 'http://localhost:3004',
    pagination: {
      defaultPageSize: 3,
      maxPageSize: 10,
    },
  };

  const mockCourse = {
    id: '1',
    name: 'Angular Basics',
    description: 'Learn Angular',
    price: 99,
    duration: 30,
    instructor: 'John Doe',
    rating: 4.5,
    imageUrl: 'http://example.com/image.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockCoursesResponse: CoursesApiResponse = {
    data: [mockCourse],
    total: 1,
    offset: 0,
    count: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
        { provide: ENVIRONMENT, useValue: mockEnvironment },
      ],
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCourses', () => {
    it('should fetch courses with default pagination', () => {
      service.getCourses().subscribe((result) => {
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe('1');
        expect(result.total).toBe(1);
      });

      const req = httpMock.expectOne((request) =>
        request.url.includes('/courses') && 
        request.params.get('count') === '3' &&
        request.params.get('offset') === '0'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCoursesResponse);
    });

    it('should enforce maxPageSize limit', () => {
      service.getCourses(20, 0).subscribe((result) => {
        expect(result).toBeDefined();
      });

      const req = httpMock.expectOne((request) =>
        request.url.includes('/courses') &&
        request.params.get('count') === '10'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCoursesResponse);
    });

    it('should use provided offset', () => {
      service.getCourses(5, 10).subscribe();

      const req = httpMock.expectOne((request) =>
        request.url.includes('/courses') &&
        request.params.get('offset') === '10'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCoursesResponse);
    });
  });

  describe('searchCourses', () => {
    it('should search courses with search term', () => {
      service.searchCourses({ count: 5, offset: 0, search: 'Angular' }).subscribe();

      const req = httpMock.expectOne((request) =>
        request.url.includes('/courses/search') &&
        request.params.get('search') === 'Angular'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCoursesResponse);
    });

    it('should enforce maxPageSize in search', () => {
      service.searchCourses({ count: 20, offset: 0, search: 'test' }).subscribe();

      const req = httpMock.expectOne((request) =>
        request.params.get('count') === '10'
      );
      req.flush(mockCoursesResponse);
    });
  });

  describe('getCourseById', () => {
    it('should fetch a course by ID', () => {
      service.getCourseById('1').subscribe((course) => {
        expect(course.id).toBe('1');
        expect(course.name).toBe('Angular Basics');
      });

      const req = httpMock.expectOne(
        `${mockEnvironment.apiUrl}/courses/1`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCourse);
    });

    it('should return error for empty ID', (done) => {
      service.getCourseById('').subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof ValidationError).toBe(true);
          done();
        }
      );
    });

    it('should handle 404 error', (done) => {
      service.getCourseById('999').subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof NotFoundError).toBe(true);
          done();
        }
      );

      const req = httpMock.expectOne(
        `${mockEnvironment.apiUrl}/courses/999`
      );
      req.flush({ message: 'Course not found' }, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createCourse', () => {
    it('should create a new course', () => {
      const createRequest: CreateCourseRequest = {
        name: 'New Course',
        description: 'New Description',
        price: 199,
        duration: 60,
        instructor: 'Jane Doe',
        imageUrl: 'http://example.com/new.jpg',
      };

      service.createCourse(createRequest).subscribe((course) => {
        expect(course.id).toBe('1');
      });

      const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createRequest);
      req.flush(mockCourse);
    });

    it('should validate required fields', (done) => {
      const invalidRequest: any = {
        name: 'Course',
        // Missing other required fields
      };

      expect(() => {
        service.createCourse(invalidRequest);
      }).toThrow();
      done();
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course', () => {
      const updateRequest: UpdateCourseRequest = {
        name: 'Updated Course',
      };

      service.updateCourse('1', updateRequest).subscribe();

      const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/courses/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);
      req.flush(mockCourse);
    });

    it('should return error for empty ID', (done) => {
      service.updateCourse('', { name: 'Updated' }).subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof ValidationError).toBe(true);
          done();
        }
      );
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      service.deleteCourse('1').subscribe();

      const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/courses/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should return error for empty ID', (done) => {
      service.deleteCourse('').subscribe(
        () => {
          fail('should have failed');
        },
        (error) => {
          expect(error instanceof ValidationError).toBe(true);
          done();
        }
      );
    });
  });
});
