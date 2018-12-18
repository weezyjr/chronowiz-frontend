import { Pipe, PipeTransform } from '@angular/core';
import { Watch } from '../Watch/watch';

@Pipe({
  name: 'watches'
})
export class WatchesPipe implements PipeTransform {
  transform(watches: Watch[],
    sizeFilter: String = 'Any size',
    materialFilter: String = 'Any material',
    bezelFilter: String = 'Any bezel',
    bracletFilter: String = 'Any braclet',
    markerFilter: String = 'Any hour markers',
    brandNameFilter: Array<String> = ['Any brand']): any[] {
    if (!watches) {
      return [];
    }
    if ((sizeFilter === 'Any size') &&
      (materialFilter === 'Any material') &&
      (bezelFilter === 'Any bezel') &&
      (bracletFilter === 'Any braclet') &&
      (markerFilter === 'Any hour markers') &&
      (brandNameFilter.length === 1 && brandNameFilter[0] === 'Any Brand')) {
      return watches;
    }
    else {
      return watches.filter(watch => {
        let sizeFilterMatch = true,
          materialFilterMatch = true,
          bezelFilterMatch = true,
          bracletFilterMatch = true,
          markerFilterMatch = true;

        const brandNameFilterMatch = true;

        if (sizeFilter !== 'Any size' && watch.caseDiameter) {
          sizeFilterMatch = (watch.caseDiameter.toLowerCase().trim())
            .localeCompare(sizeFilter.toLowerCase().trim()) === 0;
        }

        if (materialFilter !== 'Any material' && watch.caseMaterial) {
          materialFilterMatch = (watch.caseMaterial.toLowerCase().trim())
            .localeCompare(materialFilter.toLowerCase().trim()) === 0;
        }

        if (bezelFilter !== 'Any bezel' && watch.caseBezelMaterial) {
          bezelFilterMatch = (watch.caseBezelMaterial.toLowerCase().trim())
            .localeCompare(bezelFilter.toLowerCase().trim()) === 0;
        }

        if (bracletFilter !== 'Any braclet' && watch.bandMaterial) {
          bracletFilterMatch = (watch.bandMaterial.toLowerCase().trim())
            .localeCompare(bracletFilter.toLowerCase().trim()) === 0;
        }

        if (markerFilter !== 'Any hour markers' && watch.dialHands) {
          markerFilterMatch = (watch.dialHands.toLowerCase().trim())
            .localeCompare(markerFilter.toLowerCase().trim()) === 0;
        }

        return sizeFilterMatch &&
          materialFilterMatch &&
          bezelFilterMatch &&
          bracletFilterMatch &&
          markerFilterMatch &&
          brandNameFilterMatch;
      });
    }
  }
}
