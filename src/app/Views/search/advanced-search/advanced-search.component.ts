import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/Types/brand';
import { Watch } from 'src/app/Types/watch';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { NotificationsService } from 'angular2-notifications';
import { Options } from 'ng5-slider';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/User/Services/Search/search.service';
import { SearchResults } from 'src/app/Types/SearchResults';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { BrandsService } from '../../brands/brands.service';

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
export class AdvancedSearchComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  watches: Watch[];
  watchesSearchResults: Watch[];
  query: String = '';
  resultWatches: Watch[];

  brands: Array<BrandCheckBox> = [];
  brandsList: Brand[];
  brandsListRows: Array<Brand[]>;

  sortOptions: Array<String> = ['Newest', 'Most Popular', 'Lowest Price', 'Highest Price'];
  sortFactor: String = this.sortOptions[0];

  loading = false;

  watchsLimit = 12;
  minPrice: Number = 0;
  maxPrice: Number = 500000;
  options: Options = {
    floor: 0,
    ceil: 500000,
    step: 100,
    minRange: 0,
    maxRange: 500000
  };

  /*filters*/
  filtersRows = [
    { name: 'size', title: 'Choose a size', options: ['Any size', 'Small size', 'Mid size', 'Large size'] },
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
    if (!array) {
      return chunked_arr;
    }
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }

  getBrands() {
    this.brandsService.readAllBrands()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this.brandsList = <Brand[]>response.payload;
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
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService,
    private searchService: SearchService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getBrands();
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.query = params.get('query');
        if (this.query && this.query !== '' && this.query !== undefined && this.query !== 'undefined') {
          console.log(this.query);
          this.search();
        }
      });
  }

  openSortMenu() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  async search() {
    if (this.query && (this.query !== '' || this.query.length !== 0)) {
      this.resetResults();
      this.loading = true;
      await this.searchService.advSearch(this.query)
        .toPromise().then((responseData: ResponseData) => {

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          } else {
            this.watchesSearchResults = <Watch[]>response.payload;
            // to remove duplicates
            const removeDuplicates =
              (watches: Watch[]) => watches.filter((v, i) => watches.indexOf(v) === i);
            this.watchesSearchResults = removeDuplicates(this.watchesSearchResults);

            // filter the watches and render
            this.renderWatches();
          }
          this.loading = false;
        });
    } else {
      this.resetResults();
    }
  }

  resetResults() {
    this.watchesSearchResults = [];
    this.watches = [];
    this.resultWatches = [];
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
    this.sort();
  }

  sort() {
    this.watches = this.sortFunction(this.watches, this.sortFactor);
  }

  sortFunction(watches: Watch[], sortFactor: String): Watch[] {
    if (!watches) {
      return [];
    } else {
      if (sortFactor === 'Newest') {
        return watches.sort((watch1, watch2) => {
          return new Date(watch2.updatedAt).getTime() - new Date(watch1.updatedAt).getTime();
        });
      }
      else if (sortFactor === 'Most Popular') {
        return watches;
      }
      else if (sortFactor === 'Lowest Price') {
        return watches.sort((watch1, watch2) => {
          return watch1.price - watch2.price;
        });
      }
      else if (sortFactor === 'Highest Price') {
        return watches.sort((watch1, watch2) => {
          return watch2.price - watch1.price;
        });
      }
      else {
        return watches;
      }
    }
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
      (this.minPrice === 0 && this.maxPrice === 500000) &&
      (this.brands && (this.brands.length === 0 ||
        this.brands[0].checked ||
        !this.brands.find(brand => brand.checked === true)))) {
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
            if (this.filters.size === 'Small size') {
              sizeFilterMatch = Number(watch.caseDiameter) < 36;
            }
            else if (this.filters.size === 'Mid size') {
              sizeFilterMatch = Number(watch.caseDiameter) >= 36 &&
                Number(watch.caseDiameter) < 40;
            }
            else if (this.filters.size === 'Large size') {
              sizeFilterMatch = Number(watch.caseDiameter) >= 40;
            }
            else {
              sizeFilterMatch = false;
            }
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

        if (!this.brands[0].checked) {
          if (watch.brandObject) {
            brandFilterMatch =
              this.brands.find((brand) => brand.checked && brand._id === watch.brandObject) !== undefined;
          }
          else {

            brandFilterMatch = false;
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
