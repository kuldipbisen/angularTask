import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom filter pipe to filter arrays by a property value
 * Usage: items | filter : searchTerm : 'propertyName'
 * Pure: false - because array content can change
 */
@Pipe({
  name: 'filter',
  standalone: true,
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform<T>(array: T[], searchTerm: string, property: keyof T): T[] {
    if (!array || !searchTerm) {
      return array;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return array.filter((item) => {
      const value = String(item[property]).toLowerCase();
      return value.includes(lowerSearchTerm);
    });
  }
}
