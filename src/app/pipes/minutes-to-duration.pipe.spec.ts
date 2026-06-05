import { MinutesToDurationPipe } from './minutes-to-duration.pipe';

describe('MinutesToDurationPipe', () => {
  let pipe: MinutesToDurationPipe;

  beforeEach(() => {
    pipe = new MinutesToDurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert 0 minutes to "0min"', () => {
    expect(pipe.transform(0)).toBe('0min');
  });

  it('should convert null to "0min"', () => {
    expect(pipe.transform(null)).toBe('0min');
  });

  it('should convert undefined to "0min"', () => {
    expect(pipe.transform(undefined)).toBe('0min');
  });

  it('should convert 30 minutes to "30min"', () => {
    expect(pipe.transform(30)).toBe('30min');
  });

  it('should convert 60 minutes to "1h"', () => {
    expect(pipe.transform(60)).toBe('1h');
  });

  it('should convert 88 minutes to "1h 28min"', () => {
    expect(pipe.transform(88)).toBe('1h 28min');
  });

  it('should convert 120 minutes to "2h"', () => {
    expect(pipe.transform(120)).toBe('2h');
  });

  it('should convert 150 minutes to "2h 30min"', () => {
    expect(pipe.transform(150)).toBe('2h 30min');
  });

  it('should convert 500 minutes to "8h 20min"', () => {
    expect(pipe.transform(500)).toBe('8h 20min');
  });
});
