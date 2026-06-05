import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to convert minutes to hours and minutes format
 * Example: 88 => "1h 28min"
 */
@Pipe({
  name: 'minutesToDuration',
  standalone: true
})
export class MinutesToDurationPipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (minutes === null || minutes === undefined || minutes === 0) {
      return '0min';
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins}min`;
    }

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins}min`;
  }
}
