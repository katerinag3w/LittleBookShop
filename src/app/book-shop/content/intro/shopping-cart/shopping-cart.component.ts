import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

import { CartItem } from 'src/assets/CartItem';

import * as JsonToXML from 'js2xmlparser';
import { Order } from 'src/assets/Order';
import { Router } from '@angular/router';

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
  MyOrder: any;

  constructor(private cartService: CartService, private router: Router) {}

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
    // Convert to JSON
    this.stringifiedData = JSON.stringify(this.cartItems);
    this.payment = JSON.stringify(this.totalDis);
    console.log('Cart :', this.stringifiedData);
    console.log('Price :', this.payment);

    // Convert to XML
    let order: Order = {
      books: this.cartItems,
      price: this.total,
      priceAfterDiscount: this.totalDis,
    };

    this.MyOrder = JSON.stringify(order);
    this.MyOrder = JsonToXML.parse('order', this.MyOrder);
    console.log('order', this.MyOrder);

    //Navigate to Shopping List and Show Order
    this.router.navigate(['shopping-list', this.MyOrder]);
  }
}
