import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/Types/User';
import { Router } from '@angular/router';
import { Order } from 'src/app/Types/Order';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  orders: Order[] = [new Order()];
  user = new User(true);

  creditCardEndingIn: String;
  creditCardType: String;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goTo(str: string) {
    this.router.navigateByUrl('/' + str);

  }


  toggleShowDetails(currentState: Boolean, index: number) {
    if (this.orders[index]) {
      this.orders[index].showDetails = !currentState;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
