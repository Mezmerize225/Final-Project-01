import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public cartService = inject(CartService);

  public states: string[] = ['Washington', 'New York', 'Texas'];
  public stateOption = this.states;
  // public stateCategory = new FormControl('');
}
