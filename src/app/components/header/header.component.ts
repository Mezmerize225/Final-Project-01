import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HeaderCartItemsComponent } from '../header-cart-items/header-cart-items.component';


@Component({
  selector: 'app-header',
  imports: [RouterLink, ReactiveFormsModule, HeaderCartItemsComponent],
  // FormControl
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private productService = inject(ProductsService);

  // public searchControl = this.productService.getSearchCriteria();

  public products$ = this.productService.filteredProducts;

}
