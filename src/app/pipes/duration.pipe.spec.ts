import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert minutes to hours format', () => {
    expect(pipe.transform(120)).toBe('2h');
  });

  it('should convert minutes to minutes format', () => {
    expect(pipe.transform(45)).toBe('45m');
  });

  it('should convert minutes to hours and minutes format', () => {
    expect(pipe.transform(150)).toBe('2h 30m');
  });

  it('should handle zero minutes', () => {
    expect(pipe.transform(0)).toBe('N/A');
  });

  it('should handle null value', () => {
    expect(pipe.transform(null as any)).toBe('N/A');
  });

  it('should handle undefined value', () => {
    expect(pipe.transform(undefined as any)).toBe('N/A');
  });

  it('should handle negative minutes', () => {
    expect(pipe.transform(-50)).toBe('N/A');
  });

  it('should handle single minute', () => {
    expect(pipe.transform(1)).toBe('1m');
  });

  it('should handle exactly one hour', () => {
    expect(pipe.transform(60)).toBe('1h');
  });

  it('should handle 90 minutes (1h 30m)', () => {
    expect(pipe.transform(90)).toBe('1h 30m');
  });

  it('should handle large duration values', () => {
    expect(pipe.transform(1440)).toBe('24h'); // 24 hours
  });

  it('should handle 240 minutes (4 hours)', () => {
    expect(pipe.transform(240)).toBe('4h');
  });

  it('should handle 300 minutes (5 hours)', () => {
    expect(pipe.transform(300)).toBe('5h');
  });
});
