import { TestBed } from '@angular/core/testing';
import { CourseService, Course } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourses', () => {
    it('should return an observable of courses', (done) => {
      service.getCourses().subscribe(courses => {
        expect(courses).toBeDefined();
        expect(Array.isArray(courses)).toBe(true);
        expect(courses.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should emit updated courses when course is added', (done) => {
      const newCourse = {
        title: 'React Basics',
        description: 'Learn React fundamentals',
        instructor: 'Bob Johnson',
        duration: 30,
        students: 100
      };

      service.addCourse(newCourse);

      service.getCourses().subscribe(courses => {
        const addedCourse = courses.find(c => c.title === 'React Basics');
        expect(addedCourse).toBeDefined();
        expect(addedCourse?.instructor).toBe('Bob Johnson');
        done();
      });
    });
  });

  describe('getCourseById', () => {
    it('should return a course by id', () => {
      const course = service.getCourseById('1');
      expect(course).toBeDefined();
      expect(course?.title).toBe('Angular Fundamentals');
    });

    it('should return undefined for non-existent id', () => {
      const course = service.getCourseById('999');
      expect(course).toBeUndefined();
    });
  });

  describe('addCourse', () => {
    it('should add a new course', () => {
      const initialLength = (service as any).courses.length;
      const newCourse = {
        title: 'Vue.js Basics',
        description: 'Learn Vue.js',
        instructor: 'Alice Brown',
        duration: 25,
        students: 80
      };

      const addedCourse = service.addCourse(newCourse);

      expect(addedCourse).toBeDefined();
      expect(addedCourse.id).toBeDefined();
      expect(addedCourse.title).toBe('Vue.js Basics');
      expect(addedCourse.createdAt).toBeDefined();
      expect((service as any).courses.length).toBe(initialLength + 1);
    });

    it('should generate unique ids for new courses', () => {
      const course1 = service.addCourse({
        title: 'Course 1',
        description: 'Desc 1',
        instructor: 'Instructor 1',
        duration: 20,
        students: 50
      });

      const course2 = service.addCourse({
        title: 'Course 2',
        description: 'Desc 2',
        instructor: 'Instructor 2',
        duration: 20,
        students: 50
      });

      expect(course1.id).not.toBe(course2.id);
    });

    it('should update observable when course is added', (done) => {
      const newCourse = {
        title: 'New Test Course',
        description: 'Test',
        instructor: 'Test Instructor',
        duration: 15,
        students: 30
      };

      service.addCourse(newCourse);

      service.getCourses().subscribe(courses => {
        const added = courses.find(c => c.title === 'New Test Course');
        expect(added).toBeDefined();
        done();
      });
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course', () => {
      const updates: Partial<Course> = {
        title: 'Updated Angular',
        students: 200
      };

      const updated = service.updateCourse('1', updates);

      expect(updated).toBeDefined();
      expect(updated?.title).toBe('Updated Angular');
      expect(updated?.students).toBe(200);
      expect(updated?.id).toBe('1');
    });

    it('should return undefined for non-existent course', () => {
      const updated = service.updateCourse('999', { title: 'Not Found' });
      expect(updated).toBeUndefined();
    });

    it('should update observable when course is updated', (done) => {
      service.updateCourse('1', { title: 'Updated Course' });

      service.getCourses().subscribe(courses => {
        const course = courses.find(c => c.id === '1');
        expect(course?.title).toBe('Updated Course');
        done();
      });
    });

    it('should not allow id modification', () => {
      const originalId = '1';
      service.updateCourse('1', { id: 'new-id' as any });

      const course = service.getCourseById('1');
      expect(course?.id).toBe(originalId);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course successfully', () => {
      const initialLength = (service as any).courses.length;
      const result = service.deleteCourse('1');

      expect(result).toBe(true);
      expect((service as any).courses.length).toBe(initialLength - 1);
      expect(service.getCourseById('1')).toBeUndefined();
    });

    it('should return false for non-existent course', () => {
      const result = service.deleteCourse('999');
      expect(result).toBe(false);
    });

    it('should update observable when course is deleted', (done) => {
      service.deleteCourse('2');

      service.getCourses().subscribe(courses => {
        const deleted = courses.find(c => c.id === '2');
        expect(deleted).toBeUndefined();
        done();
      });
    });

    it('should not affect other courses', () => {
      const course1Before = service.getCourseById('1');
      service.deleteCourse('2');
      const course1After = service.getCourseById('1');

      expect(course1Before).toEqual(course1After);
    });
  });

  describe('searchCourses', () => {
    it('should search courses by title', () => {
      const results = service.searchCourses('Angular');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('Angular');
    });

    it('should search courses by description', () => {
      const results = service.searchCourses('basics');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should be case-insensitive', () => {
      const resultsLower = service.searchCourses('angular');
      const resultsUpper = service.searchCourses('ANGULAR');

      expect(resultsLower.length).toBe(resultsUpper.length);
    });

    it('should return empty array for no matches', () => {
      const results = service.searchCourses('NonExistentCourse');
      expect(results.length).toBe(0);
    });

    it('should return multiple results if applicable', () => {
      service.addCourse({
        title: 'Angular Advanced',
        description: 'Advanced Angular',
        instructor: 'Expert',
        duration: 50,
        students: 100
      });

      const results = service.searchCourses('Angular');
      expect(results.length).toBeGreaterThan(1);
    });
  });
});
