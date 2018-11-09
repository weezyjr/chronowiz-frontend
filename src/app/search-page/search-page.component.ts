import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit
{
  constructor(private router: Router)
  {
  }

  ngOnInit()
  {
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

  miniSearchButtonClicked(): void
  {
    // TODO Send Search Request to API
  }
}
