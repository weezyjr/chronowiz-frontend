import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CollectionsService } from 'src/app/User/Collection/collections.service';
import { NotificationsService } from 'angular2-notifications';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Collection } from 'src/app/Types/collection';
import { Watch } from 'src/app/Types/watch';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  collection: Collection;
  watches: Watch[];
  watchsLimit = 12;

  breads = [{
    name: 'Home', url: '/home',
  }, {
    name: 'Brand', url: '/home'
  }];

  filters = {
    size: 'Any size',
    material: 'Any material',
    bezel: 'Any bezel',
    braclet: 'Any braclet',
    marker: 'Any hour markers'
  };

  /*filters*/
  filtersRows = [
    { name: 'size', title: 'Choose a size', options: ['Any size', 'Mid-size', 'Large size'] },
    { name: 'material', title: 'Choose A material', options: ['Any material', 'Yellow Gold', 'Pink Gold', 'White Gold', 'Platinum'] },
    { name: 'bezel', title: 'Choose a bezel', options: ['Any bezel', 'Smooth bezel', 'Fluted bezel', 'Gem-set bezel'] },
    { name: 'braclet', title: 'Choose a braclet', options: ['Any braclet', 'Leather Strap', 'Oyster', 'President', 'Gem-Set Braslet'] },
    { name: 'marker', title: 'Choose an hour marker style', options: ['Any hour markers', 'Arabic Numerals', 'Roman Numerals', 'Classic Hour Markers', 'Gem-Set Hour Markers'] }
  ];

  constructor(private activeRoute: ActivatedRoute, private collectionsService: CollectionsService, private _notificationsService: NotificationsService) { }

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

  get isMobile() { return document.documentElement.clientWidth < 720; }

  ngOnInit() {

    let collectionID: string | String;
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      collectionID = params.get('id');
      this.collectionsService.readCollectionById(collectionID)
        .pipe(takeUntil(this.destroy$))
        .subscribe((responseData: ResponseData) => {
          console.log(responseData);

          const response: ResponseObject = responseData.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          } else {
            this.collection = <Collection>response.payload;

            // back up the watches
            this.watches = this.collection.watchObjects;

            this.renderWatches();
            // update bread crumbs
            this.breads.push({ name: this.collection.brandObject.name, url: `/brand/${this.collection.brandObject._id}` });
            this.breads.push({
              name:
                (this.collection.name !== 'UNDEFINED') &&
                  (this.collection.name) ? this.collection.name : 'Collection', url: ''
            });
          }
        });
    });
  }

  renderWatches() {
    this.watches = this.filter(this.collection.watchObjects);
  }

  filter(watches: Watch[]): Watch[] {
    if (!watches) {
      return [];
    }
    if ((this.filters.size === 'Any size') &&
      (this.filters.material === 'Any material') &&
      (this.filters.bezel === 'Any bezel') &&
      (this.filters.braclet === 'Any braclet') &&
      (this.filters.marker === 'Any hour markers') ){
      return watches;
    }
    else {
      return watches.filter(watch => {
        let sizeFilterMatch = true,
          materialFilterMatch = true,
          bezelFilterMatch = true,
          bracletFilterMatch = true,
          markerFilterMatch = true;

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
