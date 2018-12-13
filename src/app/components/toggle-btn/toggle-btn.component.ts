import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.sass']
})
export class ToggleBtnComponent implements OnInit {

  _status: Boolean = false;

  @Input() set status(value: Boolean) {
    console.log('Toggle changes' , value);
    this._status = value;
  }

  get status(): Boolean{
    return this._status;
  }

  @Output() toggle = new EventEmitter<any>();

  onClick() {
    this.status = !this.status;
    this.toggle.next(this.status);
  }

  constructor() { }

  ngOnInit() {
  }

}
