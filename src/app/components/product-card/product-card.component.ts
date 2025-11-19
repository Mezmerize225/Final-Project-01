import { Component, input, output } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  public product = input.required<IProduct>();

  public cardClick = output<void>();
  public addToCart = output<void>();
}
