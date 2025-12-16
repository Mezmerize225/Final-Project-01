import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { debounceTime, map, Observable, startWith, switchMap} from 'rxjs';
import { IProduct } from '../models/product.model';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
      map((e) => {
        return e.map(item => {
          if(item.discountPercent) {
            return {...item, newPrice: item.price - (item.price*item.discountPercent/100)}
          } return item;
         })
      })
    );
  }

  private searchControl = new FormControl('');
  private products$ = this.getProducts();

  public getSearchControl() {
    return this.searchControl;
  }

  public filteredProducts$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(300),
    switchMap((searchText) => {
      const text = (searchText || '').toLowerCase();
      return this.getProducts().pipe(
      map((products) =>
        products.filter((p) =>
        p.title.toLowerCase().includes(text))
      ))
    })
  );
}
