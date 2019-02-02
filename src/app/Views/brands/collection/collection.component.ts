import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Collection } from 'src/app/Types/collection';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandsService } from '../brands.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Watch } from 'src/app/Types/watch';
import { takeUntil } from 'rxjs/operators';
import { Link } from 'src/app/Types/Link';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.sass']
})
export class CollectionComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public collection: Collection;

  public watchsLimit = 12;

  // breadcrumps links
  public get urlSequence(): Link[] {
    if (this.brandsService.urlSequence) {
      return this.brandsService.urlSequence;
    } else {
      return [];
    }
  }

  public currentFilters = {
    size: 'Any size',
    material: 'Any material',
    bezel: 'Any bezel',
    braclet: 'Any braclet',
    marker: 'Any hour markers'
  };

  filtersOptions = [
    { name: 'size', title: 'Choose a size', options: ['Any size', 'Mid-size', 'Large size'] },
    { name: 'material', title: 'Choose A material', options: ['Any material', 'Yellow Gold', 'Pink Gold', 'White Gold', 'Platinum'] },
    { name: 'bezel', title: 'Choose a bezel', options: ['Any bezel', 'Smooth bezel', 'Fluted bezel', 'Gem-set bezel'] },
    { name: 'braclet', title: 'Choose a braclet', options: ['Any braclet', 'Leather Strap', 'Oyster', 'President', 'Gem-Set Braslet'] },
    { name: 'marker', title: 'Choose an hour marker style', options: ['Any hour markers', 'Arabic Numerals', 'Roman Numerals', 'Classic Hour Markers', 'Gem-Set Hour Markers'] }
  ];

  constructor(private activeRoute: ActivatedRoute,
    private brandsService: BrandsService,
    private _notificationsService: NotificationsService) { }

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

  get backgroundColor(): string {
    if (this.collection && this.collection.brandObject) {
      return this.brandsService.RGBandOpacityToRGBA(this.collection.brandObject);
    } else {
      return `none`;
    }
  }

  get isMobile() { return document.documentElement.clientWidth < 720; }


  async getCollectionById(id: string | String) {
    await this.brandsService.readCollectionById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        console.log(responseData);

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          const collection = <Collection>response.payload;
          this.brandsService.currentCollection = collection;
          this.collection = collection;
        }
      });
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const collectionID: string | String = params.get('id');
      if (this.brandsService.currentCollection &&
        this.brandsService.currentCollection._id === collectionID) {
        this.collection = this.brandsService.currentCollection;
      } else {
        this.getCollectionById(collectionID);
      }

    });
  }

  filterWatches() {
    if (this.collection &&
      this.collection.watchObjects) {
      this.collection = Object.assign(<Collection>{}, this.brandsService.currentCollection);
      this.collection.watchObjects =
        this.filterWatchesByOptions(this.brandsService.currentCollection.watchObjects);
    }
  }

  filterWatchesByOptions(watches: Watch[]): Watch[] {
    if (!watches) {
      return undefined;
    }
    if ((this.currentFilters.size === 'Any size') &&
      (this.currentFilters.material === 'Any material') &&
      (this.currentFilters.bezel === 'Any bezel') &&
      (this.currentFilters.braclet === 'Any braclet') &&
      (this.currentFilters.marker === 'Any hour markers')) {
      return watches;
    }
    else {
      return watches.filter(watch => {
        let sizeFilterMatch = true,
          materialFilterMatch = true,
          bezelFilterMatch = true,
          bracletFilterMatch = true,
          markerFilterMatch = true;

        if (this.currentFilters.size !== 'Any size') {
          if (watch.caseDiameter) {
            if (this.currentFilters.size === 'Small size') {
              sizeFilterMatch = Number(watch.caseDiameter) < 36;
            }
            else if (this.currentFilters.size === 'Mid size') {
              sizeFilterMatch = Number(watch.caseDiameter) >= 36 &&
                Number(watch.caseDiameter) < 40;
            }
            else if (this.currentFilters.size === 'Large size') {
              sizeFilterMatch = Number(watch.caseDiameter) >= 40;
            }
            else {
              sizeFilterMatch = false;
            }
          } else {
            sizeFilterMatch = false;
          }
        }

        if (this.currentFilters.material !== 'Any material') {
          if (watch.caseMaterial) {
            materialFilterMatch = (watch.caseMaterial.toLowerCase().trim())
              .localeCompare(this.currentFilters.material.toLowerCase().trim()) === 0;
          } else {
            materialFilterMatch = false;
          }
        }

        if (this.currentFilters.bezel !== 'Any bezel') {
          if (watch.caseBezelMaterial) {
            bezelFilterMatch = (watch.caseBezelMaterial.toLowerCase().trim())
              .localeCompare(this.currentFilters.bezel.toLowerCase().trim()) === 0;
          } else {
            bezelFilterMatch = false;
          }
        }

        if (this.currentFilters.braclet !== 'Any braclet') {
          if (watch.bandMaterial) {
            bracletFilterMatch = (watch.bandMaterial.toLowerCase().trim())
              .localeCompare(this.currentFilters.braclet.toLowerCase().trim()) === 0;
          } else {
            bracletFilterMatch = false;
          }
        }

        if (this.currentFilters.marker !== 'Any hour markers') {
          if (watch.dialIndex) {
            markerFilterMatch = (watch.dialIndex.toLowerCase().trim())
              .localeCompare(this.currentFilters.marker.toLowerCase().trim()) === 0;
          } else {
            markerFilterMatch = false;
          }
        }

        return sizeFilterMatch &&
          materialFilterMatch &&
          bezelFilterMatch &&
          bracletFilterMatch &&
          markerFilterMatch;
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
