import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Watch } from 'src/app/Types/watch';

@Injectable({
  providedIn: 'root'
})
export class WatchTrayService {
  private _currentWatches: Watch[];
  private watchTray: BehaviorSubject<Watch[]>;

  print(message: any) {
    const styles = ['color: green', 'background: yellow', 'font-size: 20px'].join(';');
    console.log('%c%s', styles, message);
  }

  constructor() {
    // get current watches
    this.watchTray = new BehaviorSubject<Watch[]>(JSON.parse(localStorage.getItem('watchTray')));
    this._currentWatches = this.watchTray.value;
  }

  public get currentWatchTrayValue(): Watch[] {
    return this.watchTray.value;
  }

  public addToWatchTray(watch: Watch): Boolean {
    // check if there is current watches ?
    if (this._currentWatches) {

      // Check if the watch is already stored ?
      const isWatchExist = this._currentWatches.find(
        (_watch) => _watch.referenceNumber === watch.referenceNumber);

      // add it if doesn't exist
      if (!isWatchExist) {
        // add to the currentWatches
        this._currentWatches.push(watch);
        return false;
      }
    }
    else {
      // create currentWatches array and add to it the current watch
      this._currentWatches = [watch];
    }
    this._updateLocalStorage();
    return true;
  }

  private _updateLocalStorage() {
    localStorage.setItem('watchTray', JSON.stringify(this._currentWatches));
    this.watchTray.next(this._currentWatches);
  }

  public removeFromWatchTray(ref: string): Boolean {
    // find watch Index
    const watchIndex = this._currentWatches.findIndex((watch: Watch) => watch.referenceNumber === ref);

    // check if exist
    if (watchIndex >= 0) {
      // remove it and update the local storage
      this._currentWatches.splice(watchIndex, 1);
      this._updateLocalStorage();
      return true;
    }
    else {
      return false;
    }
  }

}
