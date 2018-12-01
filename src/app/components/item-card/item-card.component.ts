import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent implements OnInit {

  constructor() { }

  @Input() watch: any = {
    imgSrc : 'http://placehold.it/500',
    name: '<name>',
    desc: '<descrption>'
  };

  ngOnInit() {
  }

}
