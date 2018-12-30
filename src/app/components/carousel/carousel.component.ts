import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {

  public currentOffset = 0;

  @Input()
  len = 5;

  // TODO: Smart pagination factor
  @Input()
  paginationFactor = 220;

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
    return this.currentOffset <= (this.paginationFactor * -1) * (this.len - this.carouselSize);
  }
  get atHeadOfList() {
    return this.currentOffset === 0;
  }
  moveCarousel(direction: number) {
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
