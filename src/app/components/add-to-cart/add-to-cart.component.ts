import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})
export class AddToCartComponent {

  public addItem = 0;

  addToCart() {
    console.log(this.addItem, 'item added to shopping cart');

    // push ;
    return (this.addItem +1) ;
  }
  

}
