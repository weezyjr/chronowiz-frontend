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

  isVideo(str: string): boolean {
    if (str && str !== '' && typeof str === 'string') {
      return str.toLowerCase().endsWith('.mp4') ||
        str.toLowerCase().endsWith('.avi') ||
        str.toLowerCase().endsWith('.flv') ||
        str.toLowerCase().endsWith('webm') ||
        str.toLowerCase().endsWith('.mkv') ||
        str.toLowerCase().endsWith('.wmv') ||
        str.toLowerCase().endsWith('.m4v') ||
        str.toLowerCase().endsWith('.3gp') ||
        str.toLowerCase().endsWith('.ogg');
    }
  }

}
