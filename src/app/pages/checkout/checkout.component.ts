import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public cartService = inject(CartService);
}
