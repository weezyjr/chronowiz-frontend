import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Watch } from 'src/app/Types/watch';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandsService } from '../brands.service';
import { NotificationsService } from 'angular2-notifications';
import { takeUntil } from 'rxjs/operators';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { WatchTrayService } from 'src/app/User/Services/WatchTray/watch-tray.service';
import { Link } from 'src/app/Types/Link';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.sass']
})
export class WatchComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();


  public addedToWatchTray: Boolean = false;

  watch: Watch = new Watch();
  price: string | number = 'Show Price';

  // breadcrumps links
  public get urlSequence(): Link[] {
    if (this.brandsService.urlSequence) {
      return this.brandsService.urlSequence;
    } else {
      return [];
    }
  }

  get downArrowSrc(): string {
    if (this.watch &&
      this.watch.brandObject &&
      this.watch.brandObject.contentColor === 'light') {
      return '../../../../assets/down-arrow.light.svg';
    } else {
      return '../../../../assets/down-arrow.svg';
    }
  }

  get paperBagSrc(): string {
    if (this.watch &&
      this.watch.brandObject &&
      this.watch.brandObject.contentColor === 'light') {
      return '../../../../assets/paper-bag-white.svg';
    } else {
      return '../../../../assets/paper-bag.svg';
    }
  }

  get appIconSrc(): String {
    if (this.watch &&
      this.watch.brandObject &&
      this.watch.brandObject.contentColor === 'light') {
      return '../../../../assets/app-icon.light.svg';
    } else {
      return '../../../../assets/app-icon.svg';
    }
  }


  constructor(private activeRoute: ActivatedRoute,
    private brandsService: BrandsService,
    private _notificationsService: NotificationsService,
    private watchTrayService: WatchTrayService) { }


  async getWatchByRef(ref: string | String) {
    await this.brandsService.readWatchByRef(ref)
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseData: ResponseData) => {
        console.log(responseData);

        const response: ResponseObject = responseData.response;

        if (response.type.match('ERROR')) {
          this._notificationsService.error('Error', response.message.en);
        } else {
          this.watch = <Watch>response.payload;
          this.brandsService.currentWatch = this.watch;
        }
      });
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const watchRef: string | String = params.get('ref');
      if (this.brandsService.currentWatch &&
        this.brandsService.currentWatch.referenceNumber === watchRef) {
        this.watch = this.brandsService.currentWatch;
      } else {
        this.getWatchByRef(watchRef);
      }

    });
  }

  get collectionRoute(): Array<String> {
    if (this.watch && this.watch.collectionObject && this.watch.collectionObject._id) {
      return [`/collection/${this.watch.collectionObject._id}`];
    } else {
      return ['/'];
    }
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
      this.addedToWatchTray = true;
      // change the button
    }
    else {
      this._notificationsService.error('Error', 'Something went wrong, please try again');
    }
  }

  showPrice() {
    if (this.watch.price) {
      if (this.watch.priceCurrency === 'Other') {
        this.price = this.watch.price.toLocaleString('en');
      }
      else {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: this.watch.priceCurrency,
          minimumFractionDigits: 0
        });
        this.price = formatter.format(this.watch.price) + ' ' + this.watch.priceCurrency;
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
