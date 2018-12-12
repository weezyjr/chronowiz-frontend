import { Component, OnInit, Input } from '@angular/core';
import { Link } from 'src/app/Link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass']
})
export class TabsComponent implements OnInit {

  @Input()
  links: Link[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(url: String): void {
    console.log(url);
    this.router.navigate([url]);
  }

}
