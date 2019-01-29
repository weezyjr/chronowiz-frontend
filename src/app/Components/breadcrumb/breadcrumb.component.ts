import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  breads = [{
    name: 'bread1', url: '#',
  }, {
    name: 'bread2', url: '#'
  }, {
    name: 'bread3', url: '#'
  }];

  @Input()
  content_color: 'dark' | 'light' = 'dark';

  constructor() { }

  ngOnInit() {
  }

}
