import { Component, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  public cartService = inject(CartService);
}
