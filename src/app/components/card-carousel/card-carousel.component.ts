import { Component, OnInit, Input } from '@angular/core';
import { Watch } from 'src/app/Watch/watch';
import { Collection } from 'src/app/Collection/collection';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.sass']
})
export class CardCarouselComponent implements OnInit {

  @Input()
  public collection: Collection = new Collection();

  @Input()
  public gender: String;


  public currentOffset = 0;
  public paginationFactor = 300;

  get currentWindowsWidth() { return document.documentElement.clientWidth; }
  get carouselSize() {
    if (this.currentWindowsWidth < 576) {
      return 2;
    } else if (this.currentWindowsWidth >= 576 && this.currentWindowsWidth <= 768) {
      return 3;
    } else {
      return 4;
    }
  }

  get transitionStyle() { return { 'transform': 'translateX' + '(' + this.currentOffset + 'px' + ')' }; }
  get atEndOfList() {
    /** removed watchList.length */
    return this.currentOffset <= (this.paginationFactor * -1) * (this.collection.watchObjects.length - this.carouselSize);
  }
  get atHeadOfList() {
    return this.currentOffset === 0;
  }
  moveCarousel(direction) {
    // Find a more elegant way to express the :style. consider using props to make it truly generic
    if (direction === 1 && !this.atEndOfList) {
      this.currentOffset -= this.paginationFactor;
    } else if (direction === -1 && !this.atHeadOfList) {
      this.currentOffset += this.paginationFactor;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
