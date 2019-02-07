import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/Types/brand';
import { Collection } from 'src/app/Types/collection';
import { Watch } from 'src/app/Types/watch';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { SearchService } from 'src/app/User/Services/Search/search.service';
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

  loading = false;

  constructor(
    private searchService: SearchService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  async search() {
    if (this.query && (this.query !== '' || this.query.length !== 0)) {
      this.resetResults();
      this.loading = true;
      await this.searchService.search(this.query)
        .toPromise()
        .then((responseData: ResponseData) => {
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
          this.loading = false;
        });
    }
    else {
      this.resetResults();
    }
  }

  async waitThenSearch() {
    const Q = this.query;
    this.loading = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      if (Q === this.query) {
        this.search();
      }
    });
  }

  resetResults() {
    this.brands = [];
    this.collections = [];
    this.watches = [];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
