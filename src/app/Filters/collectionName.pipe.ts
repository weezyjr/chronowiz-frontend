import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionName'
})
export class CollectionNamePipe implements PipeTransform {
  transform(collectionName: string): string {
    if (!collectionName || collectionName === 'UNDEFINED') {
      return '';
    }
    return collectionName;
  }
}
