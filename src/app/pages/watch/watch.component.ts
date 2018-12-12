import { Component, OnInit } from '@angular/core';
import { WatchesService } from 'src/app/Watch/watches.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseObject } from 'src/app/API/responseObject';
import { ResponseData } from 'src/app/API/response-data';
import { Watch } from 'src/app/Watch/watch';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.sass']
})
export class WatchComponent implements OnInit {


  watch: Watch = new Watch();
  responseData: ResponseData;
  response: ResponseObject;

  // breadcrumps links
  public breads = [{
    name: 'Home', url: '/home',
  }, {
    name: 'Brand', url: '/home'
  }];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private watchesService: WatchesService, private _notificationsService: NotificationsService) {
  }

  ngOnInit() {
    const ref = this.activeRoute.snapshot.params.ref;
    console.log(ref);
    this.watchesService.readWatch(ref)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.watch = <Watch>this.response.payload;
          if (this.watch.collectionObject.name === 'UNDEFINED') {
            this.watch.collectionObject.name = 'collection';
          }

          if (this.watch.brandObject.name && this.watch.brandObject.name !== 'UNDEFINED') {
            this.breads.push({ name: this.watch.brandObject.name, url: `/brand/${this.watch.brandObject.name}` });
          } else {
            this.breads.push({ name: 'brand', url: `/` });
          }

          if (this.watch.collectionObject.name && this.watch.collectionObject.name !== 'UNDEFINED') {
            this.breads.push({ name: this.watch.collectionObject.name, url: `/brand/${this.watch.collectionObject._id}` });
          } else {
            this.breads.push({ name: 'collection', url: `/` });
          }

          this.breads.push({ name: this.watch.referenceNumber, url: '/' });
          console.log(this.watch);
        }
      });
  }

  goToCollection() {
    this.router.navigate([`/${this.watch.brandObject.name}/collection`, { id: this.watch.collectionObject._id }]);
  }

  get ollectionUrl(): String {
    return `/brand/${this.watch.brandObject.name}/`;
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  }

}
