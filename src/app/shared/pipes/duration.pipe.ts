import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format duration in minutes to hh\h mm\min format
 * For durations less than 1 hour, display only minutes
 * 
 * Example:
 * 75 | appDuration => "1h 15 min"
 * 45 | appDuration => "45 min"
 * 150 | appDuration => "2h 30 min"
 */
@Pipe({
  name: 'appDuration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    if (minutes == null || minutes < 0) {
      return '0 min';
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins} min`;
  }
}
