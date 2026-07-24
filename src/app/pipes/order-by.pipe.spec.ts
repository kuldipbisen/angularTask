import { OrderByPipe } from './order-by.pipe';

interface TestItem {
  name: string;
  rating: number;
  price: number;
}

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort array by property in ascending order', () => {
    const items: TestItem[] = [
      { name: 'C Course', rating: 3.5, price: 30 },
      { name: 'A Course', rating: 4.5, price: 50 },
      { name: 'B Course', rating: 4.0, price: 40 }
    ];

    const result = pipe.transform(items, 'name', true);
    expect(result[0].name).toBe('A Course');
    expect(result[1].name).toBe('B Course');
    expect(result[2].name).toBe('C Course');
  });

  it('should sort array by property in descending order', () => {
    const items: TestItem[] = [
      { name: 'A Course', rating: 3.5, price: 30 },
      { name: 'B Course', rating: 4.5, price: 50 },
      { name: 'C Course', rating: 4.0, price: 40 }
    ];

    const result = pipe.transform(items, 'name', false);
    expect(result[0].name).toBe('C Course');
    expect(result[1].name).toBe('B Course');
    expect(result[2].name).toBe('A Course');
  });

  it('should sort by numeric property', () => {
    const items: TestItem[] = [
      { name: 'Course A', rating: 3.5, price: 50 },
      { name: 'Course B', rating: 4.8, price: 30 },
      { name: 'Course C', rating: 4.2, price: 40 }
    ];

    const result = pipe.transform(items, 'rating', true);
    expect(result[0].rating).toBe(3.5);
    expect(result[1].rating).toBe(4.2);
    expect(result[2].rating).toBe(4.8);
  });

  it('should sort by price in ascending order', () => {
    const items: TestItem[] = [
      { name: 'Course A', rating: 4.5, price: 50 },
      { name: 'Course B', rating: 4.0, price: 30 },
      { name: 'Course C', rating: 3.8, price: 40 }
    ];

    const result = pipe.transform(items, 'price', true);
    expect(result[0].price).toBe(30);
    expect(result[1].price).toBe(40);
    expect(result[2].price).toBe(50);
  });

  it('should sort by price in descending order', () => {
    const items: TestItem[] = [
      { name: 'Course A', rating: 4.5, price: 50 },
      { name: 'Course B', rating: 4.0, price: 30 },
      { name: 'Course C', rating: 3.8, price: 40 }
    ];

    const result = pipe.transform(items, 'price', false);
    expect(result[0].price).toBe(50);
    expect(result[1].price).toBe(40);
    expect(result[2].price).toBe(30);
  });

  it('should handle empty array', () => {
    const items: TestItem[] = [];
    const result = pipe.transform(items, 'name', true);
    expect(result.length).toBe(0);
  });

  it('should handle array with one item', () => {
    const items: TestItem[] = [
      { name: 'Course A', rating: 4.5, price: 50 }
    ];

    const result = pipe.transform(items, 'name', true);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Course A');
  });

  it('should handle array with duplicate values', () => {
    const items: TestItem[] = [
      { name: 'Course A', rating: 4.5, price: 50 },
      { name: 'Course B', rating: 4.5, price: 40 },
      { name: 'Course C', rating: 4.5, price: 30 }
    ];

    const result = pipe.transform(items, 'rating', true);
    expect(result.length).toBe(3);
    expect(result.every(item => item.rating === 4.5)).toBeTruthy();
  });

  it('should not mutate original array', () => {
    const items: TestItem[] = [
      { name: 'C Course', rating: 3.5, price: 30 },
      { name: 'A Course', rating: 4.5, price: 50 },
      { name: 'B Course', rating: 4.0, price: 40 }
    ];

    const originalOrder = items.map(item => item.name);
    pipe.transform(items, 'name', true);
    
    expect(items.map(item => item.name)).toEqual(originalOrder);
  });

  it('should use true as default for ascending order', () => {
    const items: TestItem[] = [
      { name: 'C Course', rating: 3.5, price: 30 },
      { name: 'A Course', rating: 4.5, price: 50 },
      { name: 'B Course', rating: 4.0, price: 40 }
    ];

    const result = pipe.transform(items, 'name');
    expect(result[0].name).toBe('A Course');
  });
});
