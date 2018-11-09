import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {SearchService} from '../search.service';
import {ResponseData} from '../response-data';
import {Response} from '../response';
import {Watch} from '../watch';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit
{
  query: string;
  responseData: ResponseData;
  response: Response;

  watches: Watch[];

  constructor(private router: Router,
              private searchService: SearchService,
              private _notificationsService: NotificationsService)
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
    try
    {
      this.submitSearch();
    }
    catch (error)
    {
      this._notificationsService.error('Error', 'Failed to submit the form due to missing data or photos');
    }
  }

  submitSearch(): void
  {
    console.log(this.query);

    this.searchService.search(this.query)
      .subscribe(data =>
      {
        console.log(data);

        this.responseData = data;
        this.response = this.responseData.response;

        if (this.response.type.match('ERROR'))
        {
          this._notificationsService.error('Error', this.response.message.en);
        }
        else
        {
          this.watches = <Watch[]>this.response.payload;

          if (this.watches.length === 0)
          {
            this._notificationsService.info('No results', 'No results found for query: ' + this.query);
          }
          else if (this.watches.length === 1)
          {
            this._notificationsService.success(
              'Success',
              'Watch with reference number: ' + this.watches[0].referenceNumber + ' has been found successfully');
          }
          else
          {
            this._notificationsService.success('Success', this.response.message.en);
          }
        }
      });
  }
}
