import { Component, input, output } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';


@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, AddToCartComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  public product = input.required<IProduct>();

  public cardClick = output<void>();
}
