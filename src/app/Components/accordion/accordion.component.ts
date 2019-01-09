import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.sass']
})
export class AccordionComponent implements OnInit {

  public _isOpen: Boolean = false;

  @Output() public active = new EventEmitter<Boolean>();

  @Input() public text: String = '';

  @Input() public set isOpen(state: Boolean) {
    this._isOpen = state;
  }

  public get isOpen() {
    return this._isOpen;
  }


  constructor() { }

  ngOnInit() {
  }

  toggleAccordion() {
    this.isOpen = !this.isOpen;
    this.active.emit(this.isOpen);
  }

}
