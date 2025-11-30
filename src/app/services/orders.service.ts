import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Order, OrderItem, PersonalInfo } from '../models/order.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  private apiBase = (environment && environment.apiUrl) ? environment.apiUrl : 'http://localhost:3000';
  private ordersEndpoint = `${this.apiBase}/orders`;

  // Optional: get all orders (like products.service.getProducts)
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersEndpoint).pipe(
      catchError(err => {
        console.error('Error fetching orders', err);
        return throwError(() => err);
      })
    );
  }

  // Post a new order to db.json
  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersEndpoint, order).pipe(
      catchError(err => {
        console.error('Error posting order', err);
        return throwError(() => err);
      })
    );
  }

  // Create an order object, compute totals, and post it.
  placeOrder(items: OrderItem[], personalInfo: PersonalInfo = {}): Observable<Order> {
    if (!Array.isArray(items) || !items.length) {
      // Nothing to order -> return an error observable
      return throwError(() => new Error('Cart is empty'));
    }

    // Normalize items: set quantity defaults, compute newPrice if discountPercent exists
    const normalizedItems: OrderItem[] = items.map((it) => {
      const quantity = it.quantity ?? 1;
      const newPrice = (typeof it.discountPercent === 'number')
        ? +(it.price - (it.price * it.discountPercent / 100))
        : undefined;
      return {
        ...it,
        quantity,
        ...(newPrice !== undefined ? { newPrice } : {})
      };
    });

    const total = normalizedItems.reduce((acc, item) => {
      const priceToUse = (typeof item.newPrice === 'number') ? item.newPrice : item.price;
      return acc + (priceToUse * (item.quantity ?? 1));
    }, 0);

    const order: Order = {
      items: normalizedItems,
      personalInfo: personalInfo,
      total,
      createdAt: new Date().toISOString()
    };

    // Post and on success clear cart and do any other local cleanup via tap
    return this.postOrder(order).pipe(
      tap(() => {
        try {
          if (this.cartService && typeof this.cartService.clearCart === 'function') {
            this.cartService.clearCart();
          } else {
            localStorage.removeItem('cart');
          }
        } catch {
          localStorage.removeItem('cart');
        }
      })
    );
  }

  // Helper: place order using items from the cart and provided form values
  placeOrderFromCart(personalInfo: PersonalInfo = {}): Observable<Order> {
    let items = [];
    try {
      if (this.cartService && typeof this.cartService.getItems === 'function') {
        items = this.cartService.getItems() ?? [];
      } else {
        const stored = localStorage.getItem('cart');
        items = stored ? JSON.parse(stored) : [];
      }
    } catch {
      const stored = localStorage.getItem('cart');
      items = stored ? JSON.parse(stored) : [];
    }

    if (!items.length) return throwError(() => new Error('Cart is empty'));
    return this.placeOrder(items, personalInfo);
  }
}
