import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.sass']
})
export class TermsConditionsComponent implements OnInit {

  showAll = false;
  constructor() { }

  ngOnInit() {
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
  }

}
