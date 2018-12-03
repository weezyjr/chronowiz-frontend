import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], gender: String): any[] {
    if (!items) {
      return [];
    }
    if (!gender || gender === 'All') {
      return items;
    }
    else {
      return items.filter(it => {
        return it.gender === gender;
      });
    }
  }
}
