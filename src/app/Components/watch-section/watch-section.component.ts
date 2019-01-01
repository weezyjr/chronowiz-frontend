import { Component, OnInit, Input } from '@angular/core';
import { Watch } from 'src/app/Types/watch';

@Component({
  selector: 'app-watch-section',
  templateUrl: './watch-section.component.html',
  styleUrls: ['./watch-section.component.sass']
})
export class WatchSectionComponent implements OnInit {

  @Input()
  watch: Watch = new Watch();

  constructor() {
  }

  ngOnInit() {
  }

}
