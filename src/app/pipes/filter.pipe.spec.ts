import { FilterPipe } from './filter.pipe';

interface TestItem {
  name: string;
  instructor: string;
  category: string;
}

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter array by partial string match', () => {
    const items: TestItem[] = [
      { name: 'Angular Basics', instructor: 'John', category: 'Frontend' },
      { name: 'React Guide', instructor: 'Jane', category: 'Frontend' },
      { name: 'Angular Advanced', instructor: 'Bob', category: 'Frontend' }
    ];

    const result = pipe.transform(items, 'Angular', 'name');
    expect(result.length).toBe(2);
    expect(result[0].name).toContain('Angular');
    expect(result[1].name).toContain('Angular');
  });

  it('should be case-insensitive', () => {
    const items: TestItem[] = [
      { name: 'Angular Basics', instructor: 'John', category: 'Frontend' },
      { name: 'React Guide', instructor: 'Jane', category: 'Frontend' }
    ];

    const result = pipe.transform(items, 'angular', 'name');
    expect(result.length).toBe(1);
    expect(result[0].name).toContain('Angular');
  });

  it('should filter by instructor property', () => {
    const items: TestItem[] = [
      { name: 'Course 1', instructor: 'John Doe', category: 'Frontend' },
      { name: 'Course 2', instructor: 'Jane Smith', category: 'Backend' },
      { name: 'Course 3', instructor: 'John Brown', category: 'Frontend' }
    ];

    const result = pipe.transform(items, 'John', 'instructor');
    expect(result.length).toBe(2);
  });

  it('should handle empty search term', () => {
    const items: TestItem[] = [
      { name: 'Course 1', instructor: 'John', category: 'Frontend' },
      { name: 'Course 2', instructor: 'Jane', category: 'Backend' }
    ];

    const result = pipe.transform(items, '', 'name');
    expect(result.length).toBe(2);
  });

  it('should handle null search term', () => {
    const items: TestItem[] = [
      { name: 'Course 1', instructor: 'John', category: 'Frontend' }
    ];

    const result = pipe.transform(items, null as any, 'name');
    expect(result.length).toBe(1);
  });

  it('should handle empty array', () => {
    const items: TestItem[] = [];
    const result = pipe.transform(items, 'search', 'name');
    expect(result.length).toBe(0);
  });

  it('should return empty array when no matches found', () => {
    const items: TestItem[] = [
      { name: 'Angular Basics', instructor: 'John', category: 'Frontend' },
      { name: 'React Guide', instructor: 'Jane', category: 'Frontend' }
    ];

    const result = pipe.transform(items, 'Python', 'name');
    expect(result.length).toBe(0);
  });

  it('should handle special characters in search term', () => {
    const items: TestItem[] = [
      { name: 'C++ Guide', instructor: 'John', category: 'Backend' },
      { name: 'C# Guide', instructor: 'Jane', category: 'Backend' }
    ];

    const result = pipe.transform(items, 'C++', 'name');
    expect(result.length).toBe(1);
    expect(result[0].name).toContain('C++');
  });

  it('should match partial words', () => {
    const items: TestItem[] = [
      { name: 'JavaScript Advanced', instructor: 'John', category: 'Frontend' },
      { name: 'Java Backend', instructor: 'Jane', category: 'Backend' }
    ];

    const result = pipe.transform(items, 'Java', 'name');
    expect(result.length).toBe(2);
  });

  it('should be pure false (recalculate on every change)', () => {
    // Filter pipe should have pure: false in metadata
    const metadata = (FilterPipe as any)['ɵpipe'];
    expect(metadata?.pure).toBe(false);
  });

  it('should handle whitespace in search term', () => {
    const items: TestItem[] = [
      { name: 'Angular 2 Guide', instructor: 'John', category: 'Frontend' },
      { name: 'Angular Guide', instructor: 'Jane', category: 'Frontend' }
    ];

    const result = pipe.transform(items, 'Angular 2', 'name');
    expect(result.length).toBe(1);
  });

  it('should not mutate original array', () => {
    const items: TestItem[] = [
      { name: 'Course 1', instructor: 'John', category: 'Frontend' },
      { name: 'Course 2', instructor: 'Jane', category: 'Backend' }
    ];

    const originalLength = items.length;
    pipe.transform(items, 'Course', 'name');
    expect(items.length).toBe(originalLength);
  });
});
