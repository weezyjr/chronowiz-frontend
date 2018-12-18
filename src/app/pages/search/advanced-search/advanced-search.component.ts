import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/Search/search.service';
import { Brand } from 'src/app/Brand/brand';
import { Collection } from 'src/app/Collection/collection';
import { Watch } from 'src/app/Watch/watch';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { SearchResults } from 'src/app/Search/SearchResults';
import { Options } from 'ng5-slider';
import { BrandsService } from 'src/app/Brand/brands.service';
import { CollectionsService } from 'src/app/Collection/collections.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.sass']
})
export class AdvancedSearchComponent implements OnInit {

  brands: Brand[];
  collections: Collection[];
  watches: Watch[];
  query: string;
  responseData: ResponseData;
  response: ResponseObject;
  resultWatches: Watch[];

  brandsList: Brand[];
  brandsListRows: Array<Brand[]>;

  sortOptions: Array<String> = ['Newest', 'Most Popular', 'Lowest Price', 'Highest Price'];
  sortFactor: String = this.sortOptions[0];

  watchsLimit = 12;
  minValue: Number = 0;
  maxValue: Number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    minRange: 0,
    maxRange: 100
  };

  /*filters*/
  filtersRows = [
    { name: 'size', title: 'Choose a size', options: ['Any size', 'Mid-size', 'Large size'] },
    { name: 'material', title: 'Choose A material', options: ['Any material', 'Yellow Gold', 'Pink Gold', 'White Gold', 'Platinum'] },
    { name: 'bezel', title: 'Choose a bezel', options: ['Any bezel', 'Smooth bezel', 'Fluted bezel', 'Gem-set bezel'] },
    { name: 'braclet', title: 'Choose a braclet', options: ['Any braclet', 'Leather Strap', 'Oyster', 'President', 'Gem-Set Braslet'] },
    { name: 'marker', title: 'Choose an hour marker style', options: ['Any hour markers', 'Arabic Numerals', 'Roman Numerals', 'Classic Hour Markers', 'Gem-Set Hour Markers'] }
  ];

  filters = {
    size: 'Any size',
    material: 'Any material',
    bezel: 'Any bezel',
    braclet: 'Any braclet',
    marker: 'Any hour markers',
    brandNames: []
  };


  chunk(array: any[], size: any) {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }

  getBrands() {
    this.brandsService.readAllBrands()
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.brandsList = <Brand[]>this.response.payload;
          this.brandsList.unshift(new Brand('Any Brand'));
          this.brandsListRows = this.chunk(this.brandsList, 8);
        }
      });
  }

  constructor(
    private brandsService: BrandsService,
    private searchService: SearchService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getBrands();
  }

  openSortMenu() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  search() {
    if (this.query !== '') {
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

  // render the show more list
  toggleShowMore() {
    if (this.isShowMoreOn) {
      this.watchsLimit = 12;
    }
    else {
      this.watchsLimit = Infinity;
    }
  }

  // check if the show more list is empty
  get isShowMoreOn() {
    return this.watchsLimit === Infinity;
  }
}
