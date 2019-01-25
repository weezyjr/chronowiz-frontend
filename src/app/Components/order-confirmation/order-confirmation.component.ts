import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/Types/Order';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.sass']
})
export class OrderConfirmationComponent implements OnInit {

  @Input()
  order: Order = new Order();

  constructor() {
  }

  ngOnInit() {
  }
}
