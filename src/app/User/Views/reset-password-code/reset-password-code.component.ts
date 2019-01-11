import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password-code',
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.sass']
})
export class ResetPasswordCodeComponent implements OnInit {

  code: String;
  constructor() { }

  ngOnInit() {
  }

}
