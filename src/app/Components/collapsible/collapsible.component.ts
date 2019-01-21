import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.sass']
})
export class CollapsibleComponent implements OnInit {


  @Input()
  text: String = '';


  @Input()
  color: 'red' | 'gray' | 'default' = 'default';

  active: Boolean = false;

  constructor() {
  }

  toggleContent() {
    this.active = !this.active;
  }

  ngOnInit() {
  }

}
