import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.sass']
})
export class BrandComponent implements OnInit {

  /** Dummy Data **/
  public brandWatchsList: Array<Object> = [
    {
      name: 'The Day-date ', list: [
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' }
      ]
    },
    {
      name: 'The Day-date ', list: [
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' }
      ]
    },
    {
      name: 'The Day-date ', list: [
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' }
      ]
    },
    {
      name: 'The Day-date ', list: [
        { name: ' DAY-DATE 42 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' }
      ]
    },
    {
      name: 'The Day-date ', list: [
        { name: ' DAY-DATE 42 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' },
        { name: ' DAY-DATE 40 ', desc: 'Oyster, 40 mm, yellow gold.', imgSrc: '../../../assets/brand/watch1.png', gender: 'men' }
      ]
    }
  ];
  /** Dummy Data **/

  // brand object
  public brand: any;
  // to store the rest of the list
  public showMoreList = [];

  // breadcrumps links
  public breads = [{
    name: 'Home', url: '#',
  }, {
    name: 'Brand', url: '#'
  }, {
    name: 'Rolex', url: '#'
  }];

  constructor() {

    // replace this object with the one from the server
    this.brand = {
      name: 'Rolex',
      list: this.brandWatchsList,
      coverSrc: '../../../assets/brand/rolex.png',
      desc: 'PERFORMANCE AND PRESTIGE'
    };

    /*
    split the list of watchs to 2 arrays [0->2] elements to be rendered
    [2->end] to be hidden in showMore Array
    */
    if (this.brand.list.length >= 3) {
      this.showMoreList = this.brand.list.splice(3);
    }
  }


  // render the show more list
  showMore() {
    for (const list of this.showMoreList) {
      this.brand.list.push(list);
    }
    this.showMoreList = [];
  }

  // check if the show more list is empty
  get isShowMoreEmpty() {
    return this.showMoreList.length === 0;
  }

  ngOnInit() {
  }

}
