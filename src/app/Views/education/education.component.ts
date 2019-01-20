import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.sass']
})
export class EducationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo(str: string){
    this.router.navigateByUrl(str);
  }

}
