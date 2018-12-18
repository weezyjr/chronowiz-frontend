import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {

  @Input()
  cover = 'http://placehold.it/1600x900/FFFFFF/FFFFFFF';

  @Input()
  background_sm = false;

  @Input()
  background_md = false;

  @Input()
  background_lg = false;

  constructor() { }

  ngOnInit() {
  }

}
