import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public cartService = inject(CartService);

  public states: string[] = ['Select State', 'Washington', 'New York', 'Texas'];
  public stateOption = this.states;
  // public stateCategory = new FormControl('');

  public checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required], // default is empty string
      zip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }
    async onPlaceOrder() {
        const order = {
          ...this.checkoutForm.value,
          cart: this.cartService.cartItems()
        };
        try {
          // Check if orders exists
          const res = await fetch('http://localhost:3000/orders');
          if (res.status === 404) {
            // orders does not exist, create it using PUT to /db
            await fetch('http://localhost:3000/db', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ products: this.cartService.cartItems(), orders: [order] })
            });
          } else {
            // orders exists, add new order
            await fetch('http://localhost:3000/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(order)
            });
          }
          this.cartService.clearAll();
          alert('Order placed successfully!');
        } catch (e) {
          alert('Failed to place order.');
        }
  }
}
