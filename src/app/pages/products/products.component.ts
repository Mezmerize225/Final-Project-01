import { Component, inject } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productService = inject(ProductsService);
  public cartService = inject(CartService);
  private router = inject(Router);
  public products: IProduct[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(product => this.products = product);
  }

  onCardClick(id: string) {
    this.router.navigate(['/products', id])
  } 
}
