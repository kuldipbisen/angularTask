import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe to convert minutes to human-readable duration format
 * Example: 150 => "2h 30m"
 */
@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    if (!minutes || minutes < 0) {
      return 'N/A';
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins}m`;
    }
    if (mins === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${mins}m`;
  }
}
