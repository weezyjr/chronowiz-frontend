import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-collapsible',
  templateUrl: './filter-collapsible.component.html',
  styleUrls: ['./filter-collapsible.component.sass']
})
export class FilterCollapsibleComponent implements OnInit {

  @Input()
  text: String = 'Filter';

  active: Boolean = false;

  constructor() {
  }

  toggleContent() {
    this.active = !this.active;
  }
  ngOnInit() {
  }

}
