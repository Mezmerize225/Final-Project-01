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

  public decreaseAmount(productID: string) {
    this.cartItems.update((prev) => {
        return prev.map((item) => {
          if(item.id === productID) {

            if(item.quantity === 1) {
              this.removeItem(item.id);
              return null as any;
            } else {
              return {...item, quantity: item.quantity - 1}
            }
          } return item;
        }).filter(Boolean);
      })

  }

  public removeItem(productID: string) {
    this.cartItems.update((prev) => {
      return prev.filter(item => item.id !== productID);
    })
  }

  public clearAll() {
    this.cartItems.set([]);
  }

  public subtotalPrice() {
    let sum = 0;
    for(let i = 0; i < this.cartItems().length; i++) {
      sum += this.cartItems()[i].price * this.cartItems()[i].quantity;
    }
    return Number(sum.toFixed(2));
  }

  public totalDiscount() {
    return this.cartItems().reduce((sum, item) => { 
      if(!item.newPrice) { 
        return sum;
      } else { 
      return sum + (item.price - item.newPrice) * item.quantity; 
      }
    }, 0);
  }

  public totalPrice() {
    return this.cartItems().reduce((sum, item) => {
      if(!item.newPrice) {
        return sum + (item.price * item.quantity); 
      } else {
        return sum + (item.newPrice * item.quantity);
      }
    }, 0);
  }

  public getItems(): ICartItem[] {
    return this.cartItems();
  }

  public clearCart(): void { 
    this.cartItems.set([]);
  }



}
