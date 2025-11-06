import { Component, input, output } from '@angular/core';
import { IProduct } from '../../models/product.model';


@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  public product = input.required<IProduct>();

  public cardClick = output<void>();
}
