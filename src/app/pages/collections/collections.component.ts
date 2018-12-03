import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from 'src/app/Collection/collections.service';
import { NotificationsService } from 'angular2-notifications';
import { ResponseData } from 'src/app/API/response-data';
import { ResponseObject } from 'src/app/API/responseObject';
import { Collection } from 'src/app/Collection/collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit {

  responseData: ResponseData;
  response: ResponseObject;
  collcetion: Collection;

  breads = [{
    name: 'Home', url: '/app-home-page',
  }, {
    name: 'Brand', url: '/app-home-page'
  }, {
    name: 'Rolex', url: '#'
  }, {
    name: 'Rolex', url: '#'
  }];

  /*filters*/
  filters = [
    { name: 'size', title: 'Choose a size', options: ['Any size', 'Mid-size', 'Large size'] },
    { name: 'material', title: 'Choose A material', options: ['Any Material', 'Yello Gold', 'Pink Gold', 'White Gold', 'Platinum'] },
    { name: 'bezel', title: 'Choose a bezel', options: ['Any bezel', 'Smooth bezel', 'Fluted bezel', 'Gem-set bezel'] },
    { name: 'braclet', title: 'Choose a braclet', options: ['Any braclet', 'Leather Strap', 'Oyster', 'President', 'Gem-Set Braslet'] },
    { name: 'marker', title: 'Choose an hour marker style', options: ['Any hour markers', 'Arabic Numerals', 'Roman Numerals', 'Classic Hour Markers', 'Gem-Set Hour Markers'] }
  ];

  constructor(private activeRoute: ActivatedRoute, private collectionsService: CollectionsService, private _notificationsService: NotificationsService) { }

  ngOnInit() {
    const collectionID = this.activeRoute.snapshot.params.id;
    this.collectionsService.readCollectionById(collectionID)
      .subscribe(data => {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR')) {
          this._notificationsService.error('Error', this.response.message.en);
        } else {
          this.collcetion = <Collection>this.response.payload;
        }
      });
  }

}
