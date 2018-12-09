import { Component, OnInit } from '@angular/core';
import { WatchesService } from 'src/app/Watch/watches.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activeRoute: ActivatedRoute, private watchesService: WatchesService, private _notificationsService: NotificationsService) { }

  ngOnInit() {
    const ref = this.activeRoute.snapshot.params.ref;
    this.watchesService.readWatch(ref)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.watch = <Watch>this.response.payload;
          console.log(this.watch);
        }
      });
  }

}
