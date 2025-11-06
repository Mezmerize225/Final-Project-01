import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private route = inject(ActivatedRoute);
  public productId!: string;

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') as string;
  }
}
