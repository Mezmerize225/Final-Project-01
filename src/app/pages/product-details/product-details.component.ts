import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { AddToCartComponent } from '../../components/add-to-cart/add-to-cart.component';


@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, AddToCartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  public productId!: string;
  public product!: IProduct;

  public ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') as string;

    this.findProduct();
  }

  private findProduct(): void {
    const products = this.productService.getProducts().subscribe(products => {
      const product = products.find(({ id }) => this.productId === id);
      if(product) {
        this.product = product;
      }
    })
    // const product = products.find(({ id }) => Number(this.productId) === id);
    // this.productService.getProducts().subscribe(product => this.products = product);

    // if(product) {
    //   this.product = product;
    // }
  }
}
