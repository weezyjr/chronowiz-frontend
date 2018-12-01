import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {

  @Input()
  cover = '../../../assets/brand/rolex.png';

  @Input()
  background_sm_left = false;

  @Input()
  top = false;

  @Input()
  large = false;

  constructor() { }

  ngOnInit() {
  }

}
