import { Component, OnInit, OnDestroy } from '@angular/core';
import { WatchesService } from 'src/app/User/Watch/watches.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Watch } from 'src/app/Types/watch';
import { WatchTrayService } from 'src/app/User/WatchTray/watch-tray.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.sass']
})
export class WatchComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  watch: Watch = new Watch();

  get brandName() {
    try {
      return (this.watch.brandObject && this.watch.brandObject.name) ? this.watch.brandObject.name : '';
    }
    catch (error) {
      return '';
    }
  }

  get brandLogo() {
    try {
      return (this.watch.brandObject && this.watch.brandObject.logoPhotoUrl) ? this.watch.brandObject.logoPhotoUrl : '';
    }
    catch (error) {
      return '';
    }
  }

  get collectionName() {
    try {
      return (this.watch.collectionObject && this.watch.collectionObject.name && this.watch.collectionObject.name !== 'UNDEFINED');
    }
    catch (error) {
      return false;
    }
  }

  // breadcrumps links
  public breads = [{
    name: 'Home', url: '/home',
  }, {
    name: 'Brand', url: '/home'
  }];

  constructor(
    private watchTrayService: WatchTrayService,
    private activeRoute: ActivatedRoute,
    private watchesService: WatchesService,
    private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    let ref: string;
    this.activeRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        ref = params.get('ref');
        this.watchesService.readWatch(ref)
          .pipe(takeUntil(this.destroy$))
          .subscribe((responseData: ResponseData) => {
            console.log(responseData);

            const response: ResponseObject = responseData.response;

            if (response.type.match('ERROR')) {
              this._notificationsService.error('Error', response.message.en);
            } else {
              this.watch = <Watch>response.payload;

              // Bread Crumps
              if (this.watch.brandObject) {
                if (this.watch.brandObject.name && this.watch.brandObject.name !== 'UNDEFINED') {
                  this.breads.push({ name: this.watch.brandObject.name, url: `/brand/${this.watch.brandObject.name}` });
                } else {
                  this.breads.push({ name: 'brand', url: `/watch/${this.watch.referenceNumber}` });
                }
              }

              if (this.watch.collectionObject.name && this.watch.collectionObject.name !== 'UNDEFINED') {
                this.breads.push({ name: this.watch.collectionObject.name, url: `/collection/${this.watch.collectionObject._id}` });
              } else if (this.watch.collectionObject.name && this.watch.collectionObject.name === 'UNDEFINED') {
                this.breads.push({ name: 'collection', url: `/collection/${this.watch.collectionObject._id}` });
              }
              else {
                this.breads.push({ name: 'collection', url: `/watch/${this.watch.referenceNumber}` });
              }

              this.breads.push({ name: this.watch.referenceNumber, url: '/' });
              console.log(this.watch);
            }
          });
      });
  }

  get collectionRoute(): Array<String> {
    return [`/brand/${this.watch.brandObject.name}/${this.watch.collectionObject._id}`];
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async addToWatchTray() {
    await this.watchTrayService.addToWatchTray(this.watch);
    if (this.watchTrayService.currentWatchTrayValue) {
      this._notificationsService.success('Success', 'The watch is added to the watch tray');
    }
    else {
      this._notificationsService.error('Error', 'Something went wrong, please try again');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
