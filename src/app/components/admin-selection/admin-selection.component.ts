import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Brand } from 'src/app/Brand/brand';
import { Collection } from 'src/app/Collection/collection';
import { NotificationsService } from 'angular2-notifications';
import { AdminService } from 'src/app/Admin/admin.service';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Watch } from 'src/app/Watch/watch';

@Component({
  selector: 'app-admin-selection',
  templateUrl: './admin-selection.component.html',
  styleUrls: ['./admin-selection.component.sass']
})
export class AdminSelectionComponent implements OnInit {


  @Output() brand: EventEmitter<Brand> = new EventEmitter();
  @Output() collection: EventEmitter<Collection> = new EventEmitter();
  @Output() watch: EventEmitter<Watch> = new EventEmitter();

  @Input() type: String = 'brand';

  // Selection
  selectionBrands: Brand[];
  selectedBrand: Brand = new Brand();
  selectionCollections: Collection[];
  selectedCollection: Collection = new Collection();
  selectionWatchReferenceNumber: string;
  selectedWatch: Watch;

  constructor(private _notificationsService: NotificationsService,
    private adminService: AdminService) {
    this.getBrands();
  }

  /**
  * Selection
  */
  getBrands() {
    this.adminService.readAllBrands()
      .subscribe((data: ResponseData) => {

        const response: ResponseObject = data.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        }
        else {
          this.selectionBrands = <Brand[]>response.payload;
        }
      });
  }


  async onBrandSelection(selectedBrandId: String) {
    if (selectedBrandId) {
      await this.adminService.readBrandById(selectedBrandId)
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            this.selectedBrand = <Brand>response.payload;
            this.brand.emit(this.selectedBrand);
            this.selectionCollections = this.selectedBrand.collectionObjects;
          }
        });
    }
  }

  async onCollectionSelection(selectedCollectionId: String) {
    if (selectedCollectionId) {
      await this.adminService.readCollectionById(selectedCollectionId)
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            this.selectedCollection = <Collection>response.payload;
            this.collection.emit(this.selectedCollection);
          }
        });
    }
  }

  postProcessWatch(watch: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // brandObject Fix
      if (watch.brandObject && watch.brandObject['_id']) {
        console.log('case 1');
      }
      else {
        try {
          console.warn('We are in the try block (brand):', watch);
          watch = Object.assign(watch, { brandObject: new Brand() });
          console.log('case 2', watch);
        }
        catch (err) {
          console.log(err);
        }
      }
      // collectionObject Fix
      if (watch.collectionObject && watch.collectionObject['_id']) {
        console.log('case 3');
        resolve(watch);
      }
      else {
        try {
          console.warn('We are in the try block (collection):', watch);
          watch = Object.assign(watch, { collectionObject: new Collection() });
          console.log('case 4', watch);
          resolve(watch);
        }
        catch (err) {
          console.log(err);
        }
      }
    });
  }

  async onWatchSelection(selectedWatchRef: string) {
    if (selectedWatchRef) {
      await this.adminService.readWatch(selectedWatchRef)
        .subscribe((data: ResponseData) => {

          const response: ResponseObject = data.response;

          if (response.type.match('ERROR')) {
            this._notificationsService.error('Error', response.message.en);
          }
          else {
            const watch = response.payload;
            this.postProcessWatch(watch).then((postProcessedWatch) => {
              this.selectedWatch = <Watch>postProcessedWatch;
              this.watch.emit(this.selectedWatch);
            });
          }
        });
    }
  }


  ngOnInit() {
  }

}
