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

  private _content_color_: 'dark' | 'light' = 'dark';
  @Input() set content_color(color: 'dark' | 'light') {
    if (color) {
      this._content_color_ = color;
    } else {
      this._content_color_ = 'dark';
    }
  }

  get content_color(): 'dark' | 'light' {
    if (this._content_color_) {
      return this._content_color_;
    } else {
      return 'dark';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
