import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  public cartService = inject(CartService);

  @Input() mode: 'full' | 'compact' = 'full';
  @Output() placeOrder = new EventEmitter<void>();
}
