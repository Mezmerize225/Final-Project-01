import { Component, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  public cartService = inject(CartService);
}
