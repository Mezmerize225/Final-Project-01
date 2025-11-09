import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, FormControl],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private productService = inject(ProductsService);

  // public searchControl = this.productService.getSearchCriteria();

  public products$ = this.productService.filteredProducts;

}
