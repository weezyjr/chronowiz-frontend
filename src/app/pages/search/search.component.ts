import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/Search/search.service';
import { Brand } from 'src/app/Brand/brand';
import { Collection } from 'src/app/Collection/collection';
import { Watch } from 'src/app/Watch/watch';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { SearchResults } from 'src/app/Search/SearchResults';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  brands: Brand[];
  collections: Collection[];
  watches: Watch[];

  query: string;
  responseData: ResponseData;
  response: ResponseObject;

  constructor(
    private searchService: SearchService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  search(event) {
    if (this.query !== '' || this.query.length !== 0) {
      console.log(event);
      this.searchService.search(this.query).subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          const RESULTS = <SearchResults>this.response.payload;
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
}
