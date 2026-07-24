import { TestBed } from '@angular/core/testing';
import { FilterPipe } from './filter.pipe';
import { Course } from '../../models/course.model';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let mockCourses: Course[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterPipe]
    });
    pipe = TestBed.inject(FilterPipe);

    // Setup mock courses
    mockCourses = [
      {
        id: 1,
        name: 'Angular Fundamentals',
        instructor: 'John Doe',
        duration: 240,
        rating: 4.8,
        isNew: true,
        createdDate: new Date(),
        price: 49.99,
        isFeatured: true,
        topRated: true
      },
      {
        id: 2,
        name: 'TypeScript Advanced',
        instructor: 'Jane Smith',
        duration: 180,
        rating: 4.6,
        isNew: false,
        createdDate: new Date(),
        price: 59.99,
        isFeatured: false,
        topRated: false
      },
      {
        id: 3,
        name: 'React Basics',
        instructor: 'Bob Johnson',
        duration: 120,
        rating: 4.4,
        isNew: true,
        createdDate: new Date(),
        price: 39.99,
        isFeatured: true,
        topRated: false
      },
      {
        id: 4,
        name: 'Vue.js Mastery',
        instructor: 'Alice Brown',
        duration: 300,
        rating: 4.9,
        isNew: false,
        createdDate: new Date(),
        price: 69.99,
        isFeatured: false,
        topRated: true
      }
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Basic filtering', () => {
    it('should filter courses by exact name match (case-insensitive)', () => {
      const result = pipe.transform(mockCourses, 'angular');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Angular Fundamentals');
    });

    it('should filter courses by partial name match', () => {
      const result = pipe.transform(mockCourses, 'script');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('TypeScript Advanced');
    });

    it('should be case-insensitive', () => {
      const resultLower = pipe.transform(mockCourses, 'angular');
      const resultUpper = pipe.transform(mockCourses, 'ANGULAR');
      const resultMixed = pipe.transform(mockCourses, 'AnGuLaR');
      
      expect(resultLower.length).toBe(1);
      expect(resultUpper.length).toBe(1);
      expect(resultMixed.length).toBe(1);
      expect(resultLower[0].id).toBe(resultUpper[0].id);
      expect(resultUpper[0].id).toBe(resultMixed[0].id);
    });

    it('should filter multiple courses matching pattern', () => {
      const result = pipe.transform(mockCourses, 'advanced');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('TypeScript Advanced');
    });
  });

  describe('Empty/Null search term', () => {
    it('should return all courses when search term is empty string', () => {
      const result = pipe.transform(mockCourses, '');
      
      expect(result.length).toBe(4);
    });

    it('should return all courses when search term is null', () => {
      const result = pipe.transform(mockCourses, null as any);
      
      expect(result).toEqual(mockCourses);
    });

    it('should return all courses when search term is undefined', () => {
      const result = pipe.transform(mockCourses, undefined as any);
      
      expect(result).toEqual(mockCourses);
    });

    it('should return all courses when search term is whitespace', () => {
      const result = pipe.transform(mockCourses, '   ');
      
      expect(result.length).toBe(4);
    });
  });

  describe('No matches', () => {
    it('should return empty array when no courses match', () => {
      const result = pipe.transform(mockCourses, 'NonExistent');
      
      expect(result.length).toBe(0);
      expect(result).toEqual([]);
    });

    it('should return empty array for specific non-matching term', () => {
      const result = pipe.transform(mockCourses, 'Python');
      
      expect(result.length).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle null input array', () => {
      const result = pipe.transform(null as any, 'angular');
      
      expect(result).toBe(null);
    });

    it('should handle undefined input array', () => {
      const result = pipe.transform(undefined as any, 'angular');
      
      expect(result).toBe(undefined);
    });

    it('should handle non-array input', () => {
      const result = pipe.transform({} as any, 'angular');
      
      expect(result).toEqual({});
    });

    it('should handle empty array', () => {
      const result = pipe.transform([], 'angular');
      
      expect(result.length).toBe(0);
    });
  });

  describe('Partial matches', () => {
    it('should match courses with partial names', () => {
      const result = pipe.transform(mockCourses, 'script');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toContain('script');
    });

    it('should match courses starting with search term', () => {
      const result = pipe.transform(mockCourses, 'Type');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toContain('Type');
    });

    it('should match courses ending with search term', () => {
      const result = pipe.transform(mockCourses, 'Advanced');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toContain('Advanced');
    });

    it('should match courses with search term in middle', () => {
      const result = pipe.transform(mockCourses, 'React');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toContain('React');
    });
  });

  describe('Multiple word searches', () => {
    it('should filter by multi-word course names', () => {
      const result = pipe.transform(mockCourses, 'Angular Fundamentals');
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Angular Fundamentals');
    });

    it('should find courses with partial multi-word match', () => {
      const result = pipe.transform(mockCourses, 'TypeScript');
      
      expect(result.length).toBe(1);
    });
  });

  describe('Preservation of original array', () => {
    it('should not modify original array', () => {
      const originalLength = mockCourses.length;
      const originalIds = mockCourses.map(c => c.id);
      
      pipe.transform(mockCourses, 'angular');
      
      expect(mockCourses.length).toBe(originalLength);
      expect(mockCourses.map(c => c.id)).toEqual(originalIds);
    });
  });

  describe('Impure pipe behavior', () => {
    it('should be marked as impure', () => {
      // Access metadata to verify pure property is false
      const metadata = (FilterPipe as any).ɵpipe;
      expect(metadata.pure).toBe(false);
    });
  });

  describe('Real world scenarios', () => {
    it('should handle search as user types', () => {
      let result = pipe.transform(mockCourses, '');
      expect(result.length).toBe(4);
      
      result = pipe.transform(mockCourses, 'a');
      expect(result.length).toBeGreaterThan(0);
      
      result = pipe.transform(mockCourses, 'an');
      expect(result.length).toBeGreaterThan(0);
      
      result = pipe.transform(mockCourses, 'ang');
      expect(result.length).toBe(1);
    });

    it('should handle search with special characters', () => {
      mockCourses[0].name = 'C# Programming';
      const result = pipe.transform(mockCourses, 'C#');
      
      expect(result.length).toBe(1);
    });

    it('should handle search with numbers', () => {
      mockCourses[0].name = 'JavaScript 101';
      const result = pipe.transform(mockCourses, '101');
      
      expect(result.length).toBe(1);
    });
  });

  describe('Course filtering consistency', () => {
    it('should consistently filter the same search term', () => {
      const result1 = pipe.transform(mockCourses, 'angular');
      const result2 = pipe.transform(mockCourses, 'angular');
      const result3 = pipe.transform(mockCourses, 'angular');
      
      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
    });

    it('should maintain course properties in filtered results', () => {
      const result = pipe.transform(mockCourses, 'angular');
      
      const course = result[0];
      expect(course.id).toBeDefined();
      expect(course.name).toBeDefined();
      expect(course.instructor).toBeDefined();
      expect(course.duration).toBeDefined();
      expect(course.rating).toBeDefined();
      expect(course.topRated).toBeDefined();
    });
  });
});
