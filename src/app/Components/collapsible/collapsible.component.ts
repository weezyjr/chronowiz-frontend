import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.sass']
})
export class CollapsibleComponent implements OnInit {


  @Input()
  text: String = '';

  active: Boolean = false;

  constructor() {
  }

  toggleContent() {
    this.active = !this.active;
  }

  ngOnInit() {
  }

}
