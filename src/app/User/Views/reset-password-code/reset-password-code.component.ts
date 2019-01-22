import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password-code',
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.sass']
})
export class ResetPasswordCodeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  code: String;
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
