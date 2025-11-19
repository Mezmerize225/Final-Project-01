import { Component, inject, input, OnInit, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductsService);
  public productId!: string;
  public product!: IProduct;
  // public errorPage = ;

  // public product = input.required<IProduct>();
  // public addToCart = output<void>();
  public cartService = inject(CartService);

  public ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') as string;
    
    // this.errorPage

    this.findProduct();

    // this.productNotFound();
  }



  private findProduct(): void {
    const products = this.productService.getProducts().subscribe(products => {
      const product = products.find(({ id }) => this.productId === id);
      if(product) {
        this.product = product;
      } else {
        this.router.navigate(['/**']);
      }
    })
    // const product = products.find(({ id }) => Number(this.productId) === id);
    // this.productService.getProducts().subscribe(product => this.products = product);

    // if(product) {
    //   this.product = product;
    // }
  }
}
