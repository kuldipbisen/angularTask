import { TestBed } from '@angular/core/testing';
import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DurationPipe]
    });
    pipe = TestBed.inject(DurationPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Display only minutes (less than 1 hour)', () => {
    it('should format 0 minutes', () => {
      expect(pipe.transform(0)).toBe('0 min');
    });

    it('should format 1 minute', () => {
      expect(pipe.transform(1)).toBe('1 min');
    });

    it('should format 30 minutes', () => {
      expect(pipe.transform(30)).toBe('30 min');
    });

    it('should format 45 minutes', () => {
      expect(pipe.transform(45)).toBe('45 min');
    });

    it('should format 59 minutes', () => {
      expect(pipe.transform(59)).toBe('59 min');
    });
  });

  describe('Display only hours (multiple of 60)', () => {
    it('should format 60 minutes to 1h', () => {
      expect(pipe.transform(60)).toBe('1h');
    });

    it('should format 120 minutes to 2h', () => {
      expect(pipe.transform(120)).toBe('2h');
    });

    it('should format 180 minutes to 3h', () => {
      expect(pipe.transform(180)).toBe('3h');
    });

    it('should format 240 minutes to 4h', () => {
      expect(pipe.transform(240)).toBe('4h');
    });
  });

  describe('Display hours and minutes', () => {
    it('should format 75 minutes to 1h 15 min', () => {
      expect(pipe.transform(75)).toBe('1h 15 min');
    });

    it('should format 90 minutes to 1h 30 min', () => {
      expect(pipe.transform(90)).toBe('1h 30 min');
    });

    it('should format 125 minutes to 2h 5 min', () => {
      expect(pipe.transform(125)).toBe('2h 5 min');
    });

    it('should format 150 minutes to 2h 30 min', () => {
      expect(pipe.transform(150)).toBe('2h 30 min');
    });

    it('should format 200 minutes to 3h 20 min', () => {
      expect(pipe.transform(200)).toBe('3h 20 min');
    });

    it('should format 300 minutes to 5h', () => {
      expect(pipe.transform(300)).toBe('5h');
    });

    it('should format 325 minutes to 5h 25 min', () => {
      expect(pipe.transform(325)).toBe('5h 25 min');
    });
  });

  describe('Edge cases', () => {
    it('should handle null input', () => {
      expect(pipe.transform(null as any)).toBe('0 min');
    });

    it('should handle undefined input', () => {
      expect(pipe.transform(undefined as any)).toBe('0 min');
    });

    it('should handle negative input', () => {
      expect(pipe.transform(-10)).toBe('0 min');
    });

    it('should handle very large numbers', () => {
      expect(pipe.transform(1440)).toBe('24h'); // 24 hours
    });

    it('should handle very large numbers with minutes', () => {
      expect(pipe.transform(1500)).toBe('25h'); // 25 hours
    });
  });

  describe('Boundary conditions', () => {
    it('should format 1 minute correctly', () => {
      expect(pipe.transform(1)).toBe('1 min');
    });

    it('should format 60 minutes (exactly 1 hour)', () => {
      expect(pipe.transform(60)).toBe('1h');
    });

    it('should format 61 minutes correctly', () => {
      expect(pipe.transform(61)).toBe('1h 1 min');
    });

    it('should format 119 minutes correctly', () => {
      expect(pipe.transform(119)).toBe('1h 59 min');
    });

    it('should format 120 minutes (exactly 2 hours)', () => {
      expect(pipe.transform(120)).toBe('2h');
    });
  });

  describe('Real world examples', () => {
    it('should format course durations correctly', () => {
      expect(pipe.transform(88)).toBe('1h 28 min'); // From requirements
      expect(pipe.transform(240)).toBe('4h'); // Angular course
      expect(pipe.transform(180)).toBe('3h'); // TypeScript course
      expect(pipe.transform(300)).toBe('5h'); // RxJS course
    });
  });
});
