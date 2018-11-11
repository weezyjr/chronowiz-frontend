import {Component, OnInit} from '@angular/core';
import {Watch} from '../watch';
import {SearchService} from '../search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.css']
})
export class WatchDetailsComponent implements OnInit
{
  watch: Watch;

  constructor(private searchService: SearchService, private router: Router)
  {
  }

  ngOnInit()
  {
    this.searchService.currentWatch.subscribe(watch => this.watch = watch);
  }

  accountButtonClicked(): void
  {
    this.router.navigate(['/app-add-watch-form']);
  }

  searchButtonClicked(): void
  {
    this.router.navigate(['/app-search-page']);
  }

  mainIconButtonClicked(): void
  {
    this.router.navigate(['/']);
  }

}
