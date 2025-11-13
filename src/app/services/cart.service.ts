import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ICartItem } from '../models/cartitem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = signal<ICartItem[]>([]);
  public cartTotalItems = computed(() => {
    return this.cartItems().reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
  });

  public addCartItem(product: IProduct) {
    const cartItem = this.cartItems().find((item) => {
      return item.id === product.id;
    })
    if(!cartItem) {
      this.cartItems.update((prev) => {
        return prev.concat([{...product, quantity: 1}])
      })
    } else {
      this.cartItems.update((prev) => {
        return prev.map((item) => {
          if(item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          } return item;
        })
      })
    }
  }

  public increaseAmount(productID: string) {
    this.cartItems.update((prev) => {
        return prev.map((item) => {
          if(item.id === productID) {
            return {...item, quantity: item.quantity + 1}
          } return item;
        })
      })

  }


}
