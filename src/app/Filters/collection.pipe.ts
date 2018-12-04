import { Pipe, PipeTransform } from '@angular/core';
import { Watch } from '../Watch/watch';

@Pipe({
  name: 'collection'
})
export class CollectionPipe implements PipeTransform {
  transform(items: Watch[], currentFilters = { size: 'Any size', material: 'Any material', bezel: 'Any bezel', braclet: 'Any braclet', marker: 'Any hour markers' }): any[] {
    if (!items) {
      return [];
    }
    if ((currentFilters.size === 'Any size') &&
      (currentFilters.material === 'Any material') &&
      (currentFilters.bezel === 'Any bezel') &&
      (currentFilters.braclet === 'Any braclet') &&
      (currentFilters.marker === 'Any hour markers')) {
      return items;
    }
    else {
      return items.filter(it => {
        let material = true, caseDiameter = true, bezel = true, braclet = true;
        if (currentFilters.size !== 'Any size') {
          caseDiameter = it.caseDiameter === currentFilters.size;
        }
        if (currentFilters.material !== 'Any material') {
          material = it.caseMaterial === currentFilters.material;
        }
        if (currentFilters.bezel !== 'Any bezel') {
          bezel = it.caseBezelMaterial === currentFilters.bezel;
        }
        if (currentFilters.braclet !== 'Any size') {
          braclet = it.band === currentFilters.braclet;
        }
        return material && caseDiameter && bezel && braclet;
      });
    }
  }
}
