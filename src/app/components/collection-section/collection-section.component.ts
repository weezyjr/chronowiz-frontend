import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/Collection/collection';

@Component({
  selector: 'app-collection-section',
  templateUrl: './collection-section.component.html',
  styleUrls: ['./collection-section.component.sass']
})
export class CollectionSectionComponent implements OnInit {

  @Input()
  public collection: Collection = new Collection();

  @Input()
  public gender: String;

  constructor() { }

  ngOnInit() {
  }

}
