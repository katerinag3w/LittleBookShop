import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Book } from 'src/assets/Book';
import { CartItem } from 'src/assets/CartItem';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalDis: number = 0;

  stringifiedData: any;
  payment: any;

  constructor(private cartService: CartService) {}

  items$ = this.cartService.items$;
  totalPrice$ = this.cartService.totalPrice$;
  totalPriceWithDiscount$ = this.cartService.totalPriceWithDiscount$;

  ngOnInit(): void {
    //Not used, but they work
    this.items$.subscribe((data) => {
      this.cartItems = data;
    });
    this.totalPrice$.subscribe((data) => {
      this.total = data;
    });
    this.totalPriceWithDiscount$.subscribe((data) => {
      this.totalDis = data;
    });
  }

  addProductToCart(product: CartItem) {
    this.cartService.addToCart(product);
  }

  deleteProductFromCart(product: CartItem, idx: number) {
    this.cartService.deleteItemFromCart(product, idx);
  }

  reduceProductFromCart(product: CartItem, i: number) {
    if (product.quantityToBuy == 1) {
      this.cartService.deleteItemFromCart(product, i);
    } else {
      this.cartService.reduceCartItems(product, i);
    }
  }

  buy() {
    //console.log(this.cartItems);
    //console.log(this.totalDis);

    // Convert to JSON
    this.stringifiedData = JSON.stringify(this.cartItems);
    this.payment = JSON.stringify(this.totalDis);
    console.log('Cart :', this.stringifiedData);
    console.log('Price :', this.payment);

    // Convert to XML
    this.stringifiedData = JSON.stringify(this.cartItems);
    this.payment = JSON.stringify(this.totalDis);
    console.log('Cart :', this.stringifiedData);
    console.log('Price :', this.payment);
  }
}
