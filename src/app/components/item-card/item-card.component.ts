import { Component, OnInit, Input } from '@angular/core';
import { Watch } from 'src/app/Watch/watch';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent implements OnInit {

  constructor() { }

  @Input() watch: Watch = new Watch(true);

  ngOnInit() {
  }

}
