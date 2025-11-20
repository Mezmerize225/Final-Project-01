import { Component } from '@angular/core';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';

@Component({

  imports: [ShoppingCartComponent, OrderSummaryComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartPageComponent {
  
}
