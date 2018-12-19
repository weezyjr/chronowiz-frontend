import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/Search/search.service';
import { Brand } from 'src/app/Brand/brand';
import { Watch } from 'src/app/Watch/watch';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { SearchResults } from 'src/app/Search/SearchResults';
import { Options } from 'ng5-slider';
import { BrandsService } from 'src/app/Brand/brands.service';
import { WatchesService } from 'src/app/Watch/watches.service';

interface BrandCheckBox {
  _id: string;
  name: string;
  checked: Boolean;
}

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.sass']
})
export class AdvancedSearchComponent implements OnInit {

  watches: Watch[];
  watchesSearchResults: Watch[];
  query: String = '';
  responseData: ResponseData;
  response: ResponseObject;
  resultWatches: Watch[];

  brands: Array<BrandCheckBox> = [];
  brandsList: Brand[];
  brandsListRows: Array<Brand[]>;

  sortOptions: Array<String> = ['Newest', 'Most Popular', 'Lowest Price', 'Highest Price'];
  sortFactor: String = this.sortOptions[0];

  watchsLimit = 12;
  minPrice: Number = 0;
  maxPrice: Number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000,
    step: 100,
    minRange: 0,
    maxRange: 100000
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
          for (const brand of this.brandsList) {
            if (brand.name) {
              this.brands.push({ _id: brand._id, name: brand.name, checked: false });
            }
          }
          this.brands.unshift({ _id: 'Any brand', name: 'Any brand', checked: true });
          this.brandsListRows = this.chunk(this.brands, 8);
        }
      });
  }

  constructor(
    private watchesService: WatchesService,
    private brandsService: BrandsService,
    private searchService: SearchService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getBrands();
    this.search();
  }

  openSortMenu() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  search() {
    if (this.query !== '' || this.query.length !== 0) {
      this.searchService.search(this.query).subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          const RESULTS = <SearchResults>this.response.payload;
          this.watchesSearchResults = <Watch[]>RESULTS.watches;
          this.renderWatches();
        }
      });
    }
    else {
      this.watchesService.readWatches().subscribe(data => {
        this.responseData = data;
        this.response = this.responseData.response;
        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.watchesSearchResults = <Watch[]>this.response.payload;
          this.renderWatches();
        }
      });
    }
  }

  resetResults() {
    this.watchesSearchResults = [];
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

  renderWatches() {
    this.watches = this.filter(this.watchesSearchResults);
  }

  filter(watches: Watch[]): Watch[] {
    if (!watches) {
      return [];
    }
    if ((this.filters.size === 'Any size') &&
      (this.filters.material === 'Any material') &&
      (this.filters.bezel === 'Any bezel') &&
      (this.filters.braclet === 'Any braclet') &&
      (this.filters.marker === 'Any hour markers') &&
      (this.minPrice === 0 && this.maxPrice === 100000) &&
      (this.brands.length === 1 && this.brands[0].checked)) {
      return watches;
    }
    else {
      return watches.filter(watch => {
        let sizeFilterMatch = true,
          materialFilterMatch = true,
          bezelFilterMatch = true,
          bracletFilterMatch = true,
          markerFilterMatch = true,
          priceFilterMatch = true,
          brandFilterMatch = true;

        if (this.filters.size !== 'Any size') {
          if (watch.caseDiameter) {
            sizeFilterMatch = (watch.caseDiameter.toLowerCase().trim())
              .localeCompare(this.filters.size.toLowerCase().trim()) === 0;
          } else {
            sizeFilterMatch = false;
          }
        }

        if (this.filters.material !== 'Any material') {
          if (watch.caseMaterial) {
            materialFilterMatch = (watch.caseMaterial.toLowerCase().trim())
              .localeCompare(this.filters.material.toLowerCase().trim()) === 0;
          } else {
            materialFilterMatch = false;
          }
        }

        if (this.filters.bezel !== 'Any bezel') {
          if (watch.caseBezelMaterial) {
            bezelFilterMatch = (watch.caseBezelMaterial.toLowerCase().trim())
              .localeCompare(this.filters.bezel.toLowerCase().trim()) === 0;
          } else {
            bezelFilterMatch = false;
          }
        }

        if (this.filters.braclet !== 'Any braclet') {
          if (watch.bandMaterial) {
            bracletFilterMatch = (watch.bandMaterial.toLowerCase().trim())
              .localeCompare(this.filters.braclet.toLowerCase().trim()) === 0;
          } else {
            bracletFilterMatch = false;
          }
        }

        if (this.filters.marker !== 'Any hour markers') {
          if (watch.dialIndex) {
            markerFilterMatch = (watch.dialIndex.toLowerCase().trim())
              .localeCompare(this.filters.marker.toLowerCase().trim()) === 0;
          } else {
            markerFilterMatch = false;
          }
        }

        if (this.minPrice !== 0 || this.maxPrice !== 100000) {
          if (watch.price) {
            priceFilterMatch = watch.price >= this.minPrice && watch.price <= this.maxPrice;
          } else {
            priceFilterMatch = false;
          }
        }

        if (this.brands.length > 1 && !this.brands[0].checked) {
          for (const brand of this.brands) {
            if (brand.checked) {
              brandFilterMatch = watch.brandObject === brand._id;
              break;
            }
            else{
              brandFilterMatch = false;
            }
          }
        }

        return sizeFilterMatch &&
          materialFilterMatch &&
          bezelFilterMatch &&
          bracletFilterMatch &&
          markerFilterMatch &&
          brandFilterMatch &&
          priceFilterMatch;
      });
    }
  }

}
