import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {

  public currentOffset = 0;
  public currentPage = 1;

  @Input() len = 5;
  @Input() elementsPerSm = 2;
  @Input() elementsPerMd = 3;
  @Input() elementsPerLg = 4;


  // TODO: Smart pagination factor
  get paginationFactor() {
    const _content = document.getElementById('content');
    if (_content) {
      return _content.clientWidth - 30;
    } else {
      return 300;
    }
  }


  get currentWindowsWidth() { return document.documentElement.clientWidth; }

  get carouselSize() {
    if (this.currentWindowsWidth < 576) {
      return this.elementsPerSm;
    } else if (this.currentWindowsWidth >= 576 && this.currentWindowsWidth <= 768) {
      return this.elementsPerMd;
    } else {
      return this.elementsPerLg;
    }
  }

  get numberOfPages() {
    return Math.ceil(this.len / this.carouselSize);
  }

  get transitionStyle() { return { 'transform': 'translateX' + '(' + this.currentOffset + 'px' + ')' }; }
  get atEndOfList() {
    return this.currentPage === this.numberOfPages;
  }
  get atHeadOfList() {
    return this.currentPage === 1;
  }
  moveCarousel(direction: number) {
    // Find a more elegant way to express the :style. consider using props to make it truly generic
    if (direction === 1 && !this.atEndOfList) {
      this.currentOffset -= this.paginationFactor;
      this.currentPage++;
      console.log(this.currentPage);
    } else if (direction === -1 && !this.atHeadOfList) {
      this.currentOffset += this.paginationFactor;
      this.currentPage--;
      console.log(this.currentPage);
    }
  }
  constructor() { }
  ngOnInit() {
  }
}
