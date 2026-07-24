import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe to sort arrays by a property
 * Usage: items | orderBy : 'propertyName' : true/false
 * Pure: false - recalculates on every change detection
 */
@Pipe({
  name: 'orderBy',
  standalone: true,
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform<T>(array: T[], property: keyof T, isAscending: boolean = true): T[] {
    if (!array || array.length === 0) {
      return array;
    }

    const sorted = [...array].sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA === valueB) {
        return 0;
      }

      if (isAscending) {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });

    return sorted;
  }
}
