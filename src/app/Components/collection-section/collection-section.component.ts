import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/Types/collection';
import { Watch } from 'src/app/Types/watch';

@Component({
  selector: 'app-collection-section',
  templateUrl: './collection-section.component.html',
  styleUrls: ['./collection-section.component.sass']
})
export class CollectionSectionComponent implements OnInit {

  private _collection_: Collection = new Collection();
  private _watches_: Watch[];
  public _gender_: String;

  @Input()
  set collection(collection: Collection) {
    this._collection_ = collection;
  }

  get collection(): Collection {
    return this._collection_;
  }

  @Input()
  set watches(watches: Watch[]) {
    this._watches_ = watches;
  }

  get watches(): Watch[] {
    // default: in case of collection input
    if (!this._watches_ && this._collection_ && this._collection_.watchObjects) {
      console.log(1, this._watches_);
      return this._collection_.watchObjects;
    }
    else {
      // if the watches explicitly was the input
      console.log(2, this._watches_);
      return this._watches_;
    }
  }


  // need to remove this pipe
  @Input()
  set gender(gender: String) {
    this._gender_ = gender;
  }

  get gender(): String {
    return this._gender_;
  }

  constructor() { }

  ngOnInit() {
  }

}
