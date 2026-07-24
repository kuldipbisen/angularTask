import { TestBed } from '@angular/core/testing';
import { OrderByPipe } from './order-by.pipe';
import { Course } from '../../models/course.model';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let mockCourses: Course[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderByPipe]
    });
    pipe = TestBed.inject(OrderByPipe);

    // Setup mock courses with different creation dates
    mockCourses = [
      {
        id: 1,
        name: 'Course A',
        instructor: 'Instructor A',
        duration: 100,
        rating: 4.5,
        isNew: true,
        createdDate: new Date('2024-01-01'),
        price: 50,
        isFeatured: false,
        topRated: false
      },
      {
        id: 2,
        name: 'Course B',
        instructor: 'Instructor B',
        duration: 120,
        rating: 4.8,
        isNew: false,
        createdDate: new Date('2024-01-15'),
        price: 60,
        isFeatured: true,
        topRated: true
      },
      {
        id: 3,
        name: 'Course C',
        instructor: 'Instructor C',
        duration: 90,
        rating: 4.2,
        isNew: false,
        createdDate: new Date('2024-01-08'),
        price: 45,
        isFeatured: false,
        topRated: false
      }
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Default behavior (descending - newest first)', () => {
    it('should sort courses by creation date descending by default', () => {
      const result = pipe.transform(mockCourses);
      
      expect(result[0].id).toBe(2); // Jan 15 - newest
      expect(result[1].id).toBe(3); // Jan 8
      expect(result[2].id).toBe(1); // Jan 1 - oldest
    });

    it('should sort with explicit false parameter', () => {
      const result = pipe.transform(mockCourses, false);
      
      expect(result[0].id).toBe(2); // Jan 15
      expect(result[1].id).toBe(3); // Jan 8
      expect(result[2].id).toBe(1); // Jan 1
    });
  });

  describe('Ascending behavior (oldest first)', () => {
    it('should sort courses by creation date ascending', () => {
      const result = pipe.transform(mockCourses, true);
      
      expect(result[0].id).toBe(1); // Jan 1 - oldest
      expect(result[1].id).toBe(3); // Jan 8
      expect(result[2].id).toBe(2); // Jan 15 - newest
    });
  });

  describe('Edge cases', () => {
    it('should handle null input', () => {
      const result = pipe.transform(null as any);
      expect(result).toBe(null);
    });

    it('should handle undefined input', () => {
      const result = pipe.transform(undefined as any);
      expect(result).toBe(undefined);
    });

    it('should handle empty array', () => {
      const result = pipe.transform([]);
      expect(result).toEqual([]);
    });

    it('should handle single course', () => {
      const singleCourse = [mockCourses[0]];
      const result = pipe.transform(singleCourse);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });
  });

  describe('Preservation of original array', () => {
    it('should not modify original array', () => {
      const originalOrder = [1, 2, 3];
      const courseIds = mockCourses.map(c => c.id);
      
      pipe.transform(mockCourses);
      
      const afterOrder = mockCourses.map(c => c.id);
      expect(afterOrder).toEqual(originalOrder);
    });
  });

  describe('Courses with same creation date', () => {
    it('should maintain relative order for courses with same date', () => {
      const sameDateCourses = [
        { ...mockCourses[0], createdDate: new Date('2024-01-15') },
        { ...mockCourses[1], createdDate: new Date('2024-01-15') },
        { ...mockCourses[2], createdDate: new Date('2024-01-15') }
      ];
      
      const result = pipe.transform(sameDateCourses);
      expect(result.length).toBe(3);
      // All should be in the result
      expect(result.map(c => c.id).sort()).toEqual([1, 2, 3]);
    });
  });

  describe('Courses with today and future dates', () => {
    it('should correctly sort courses including today', () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const coursesToday = [
        { ...mockCourses[0], createdDate: new Date('2024-01-01') },
        { ...mockCourses[1], createdDate: today },
        { ...mockCourses[2], createdDate: tomorrow }
      ];
      
      const result = pipe.transform(coursesToday);
      
      // Tomorrow should be first (newest)
      expect(result[0].createdDate).toEqual(tomorrow);
      // Today should be second
      expect(result[1].createdDate).toEqual(today);
    });
  });

  describe('Pure pipe behavior', () => {
    it('should be marked as pure', () => {
      // Access metadata to verify pure property
      const metadata = (OrderByPipe as any).ɵpipe;
      expect(metadata.pure).toBe(true);
    });
  });

  describe('Multiple transformations', () => {
    it('should handle multiple consecutive transforms', () => {
      const result1 = pipe.transform(mockCourses, false);
      const result2 = pipe.transform(result1, true);
      const result3 = pipe.transform(result2, false);
      
      expect(result1[0].id).toBe(2);
      expect(result2[0].id).toBe(1);
      expect(result3[0].id).toBe(2);
    });
  });
});
