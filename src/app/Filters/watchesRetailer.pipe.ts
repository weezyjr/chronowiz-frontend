import { Pipe, PipeTransform } from '@angular/core';
import { Watch } from '../Watch/watch';

@Pipe({
  name: 'watchesRetailerFilter'
})
export class WatchesRetailerPipe implements PipeTransform {
  transform(items: Watch[], brandID?: String, collectionID?: String, watchRef?: String): any[] {
    if (!items) {
      return [];
    }
    if (
      (!brandID) &&
      (!collectionID) &&
      (!watchRef)
    ) {
      return items;
    }
    else {
      return items.filter(it => {
        let brandFilter = true, collectionFilter = true, watchFilter = true;
        if (brandID) {
          console.log(it, it.brandObject);
          brandFilter = it.brandObject === brandID || it.brandObject.name === brandID;
        }
        if (collectionID) {
          collectionFilter = it.collectionObject === collectionID || it.collectionObject === collectionID;
        }
        if (watchRef) {
          watchFilter = it.referenceNumber === watchRef;
        }
        return brandFilter && collectionFilter && watchFilter;
      });
    }
  }
}
