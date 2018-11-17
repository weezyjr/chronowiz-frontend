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

  constructor(private searchService: SearchService, private router: Router)
  {
    this.price = 'Show Price';
  }

  watch: Watch;
  price: string;
  functionsList: string;

  scrollTo(className: string): void
  {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({behavior: 'smooth'});
  }

  ngOnInit()
  {
    this.searchService.currentWatch.subscribe(watch =>
    {
      if (watch.referenceNumber) // we test for any mandatory field
      {
        this.watch = watch;

        this.updateFunctionsList();
      }
      else
      {
        this.watch = new Watch(true);

        this.updateFunctionsList();
      }
    });
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

  section5rightButtonClicked(): void
  {

  }

  showPrice(): void
  {
    if (this.watch.priceCurrency === 'Other')
    {
      this.price = this.watch.price.toLocaleString('en');
    }
    else
    {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.watch.priceCurrency,
        minimumFractionDigits: 0
      });

      this.price = formatter.format(this.watch.price) + ' ' + this.watch.priceCurrency;
    }
  }

  updateFunctionsList(): void
  {
    this.functionsList = this.watch.functions.map(x => x.value).join(', ');
  }
}
