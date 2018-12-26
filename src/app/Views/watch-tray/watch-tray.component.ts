import { Component, OnInit } from '@angular/core';
import { WatchTrayService } from 'src/app/WatchTray/watch-tray.service';
import { Watch } from 'src/app/Watch/watch';

@Component({
  selector: 'app-watch-tray',
  templateUrl: './watch-tray.component.html',
  styleUrls: ['./watch-tray.component.sass']
})
export class WatchTrayComponent implements OnInit {

  public showAll = false;
  public watches: Watch[] = [];
  constructor(private watchTrayService: WatchTrayService) { }

  ngOnInit() {
    this.watches = this.watchTrayService.currentWatchTrayValue;
    this.watchTrayService.print(this.watches[0]);
  }

  removeWatch(ref: string) {
    this.watchTrayService.removeFromWatchTray(ref);
  }

  watchFunctionsToStr(functions) {
    return functions.map(fun => fun.value).join(', ');
  }

  toggleShowMore() {
    this.showAll = !this.showAll;
  }

}
