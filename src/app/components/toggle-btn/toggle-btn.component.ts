import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.sass']
})
export class ToggleBtnComponent implements OnInit {

  @Input()
  status: Boolean = false;

  @Output() toggle = new EventEmitter<any>();

  onClick(){
    this.status = !this.status;
    this.toggle.next(this.status);
  }
  constructor() { }

  ngOnInit() {
  }

}
