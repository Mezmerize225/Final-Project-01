import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, startWith} from 'rxjs';
import { IProduct } from '../models/product.model';
import { FormControl } from '@angular/forms';
import { products } from '../../../db.json';

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
  allProducts: IProduct[] = products as any;
  filteredProducts: IProduct[] = [];

  ngOnInit() {
    this.filteredProducts = this.allProducts;

    
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchText) => {
      const text = (searchText || '').toLowerCase();
      this.filteredProducts = this.allProducts.filter((p) =>
        p.title.toLowerCase().includes(text)
      );
    });
  }


  // public searchCriteria$ = this.searchControl.valueChanges.pipe(
  //   startWith(this.searchControl.value),
  //   debounceTime(300),
  //   distinctUntilChanged()
  // )

  // public filteredProducts$ = this.searchCriteria$.pipe(
  //   ( searchCriteria$ ) => this.getProducts().pipe(
  //     map((products: IProduct[]) => {
  //       let filteredProducts = products;
        
  //       if(searchCriteria$) {
  //         filteredProducts = filteredProducts.filter((item: IProduct) => item.title.toLowerCase().includes(searchCriteria$.toLowerCase()))
  //       }
  //       return filteredProducts;
  //     })
  //   )
  // )

  // public getSearchCriteria(): FormControl {
  //   return this.searchControl
  // }

  // public getProducts(): Observable<IProduct[]> {
  //   return of(this.products)
  // }

}
