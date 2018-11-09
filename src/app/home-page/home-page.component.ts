import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit
{
  constructor(private router: Router)
  {
  }

  ngOnInit()
  {
  }

  userButtonClicked(): void
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
