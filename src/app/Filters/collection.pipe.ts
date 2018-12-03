import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collection'
})
export class CollectionPipe implements PipeTransform {
  transform(items: any[], size: String, material: String): any[] {
    if (!items) {
      return [];
    }
    if (!size && !material) {
      return items;
    }
    else {
      return items.filter(it => {
        return (it.caseDiameter === size) &&
        (it.caseMaterial === material);
      });
    }
  }
}
