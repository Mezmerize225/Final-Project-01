import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-cart-items',
  imports: [RouterModule],
  templateUrl: './header-cart-items.component.html',
  styleUrl: './header-cart-items.component.scss'
})
export class HeaderCartItemsComponent {
  public cartService = inject(CartService);
  
}
