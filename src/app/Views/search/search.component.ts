import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/Types/brand';
import { Collection } from 'src/app/Types/collection';
import { Watch } from 'src/app/Types/watch';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { SearchService } from 'src/app/User/Search/search.service';
import { SearchResults } from 'src/app/Types/SearchResults';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  brands: Brand[];
  collections: Collection[];
  watches: Watch[];

  query: string;


  constructor(
    private searchService: SearchService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  search() {
    if (this.query !== '' || this.query.length !== 0) {
      this.searchService.search(this.query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        console.log(responseData);

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          const RESULTS = <SearchResults>response.payload;
          this.brands = <Brand[]>RESULTS.brands;
          this.collections = <Collection[]>RESULTS.collections;
          this.watches = <Watch[]>RESULTS.watches;
          console.log(RESULTS);
        }
      });
    }
    else {
      this.resetResults();
    }
  }

  resetResults() {
    this.brands = [];
    this.collections = [];
    this.watches = [];
  }

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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
