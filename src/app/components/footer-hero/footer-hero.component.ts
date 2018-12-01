import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-hero',
  templateUrl: './footer-hero.component.html',
  styleUrls: ['./footer-hero.component.sass']
})
export class FooterHeroComponent implements OnInit {

  @Input()
  brand = {
    name: 'Rolex',
    desc: 'PERFORMANCE AND PRESTIGE',
    footerSrc: '../../../assets/brand/footrbg.png'
  };

  constructor() { }

  ngOnInit() {
  }

}
