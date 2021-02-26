import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { take, map, tap, filter } from 'rxjs/operators';
import { CartItem } from 'src/assets/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    let existingCartItems = JSON.parse(localStorage.getItem('books'));
    let total = JSON.parse(localStorage.getItem('total'));
    let totalWithDiscount = JSON.parse(
      localStorage.getItem('totalWithDiscount')
    );

    if (!existingCartItems) {
      existingCartItems = [];
    }
    if (!total) {
      total = 0.0;
    }

    if (!totalWithDiscount) {
      total = 0.0;
    }

    this.itemsSubject.next(existingCartItems);
    this.totalSubject.next(total);
    this.totalWithDiscountSubject.next(totalWithDiscount);
  }
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0.0);
  private totalWithDiscountSubject = new BehaviorSubject<number>(0.0);

  items$ = this.itemsSubject.asObservable();
  itemsNoObs: CartItem[];

  totalPrice$ = this.totalSubject.asObservable();
  totalPriceWithDiscount$ = this.totalWithDiscountSubject.asObservable();

  addToCart(product: CartItem) {
    //Check if product exists
    this.items$.subscribe((x) => {
      this.itemsNoObs = x;
    });

    const productExistInCart = this.itemsNoObs.find(
      ({ id }) => id === product.id
    );

    this.increasePrice(product);

    if (!productExistInCart) {
      product.quantityToBuy = 1;

      this.items$
        .pipe(
          take(1),
          map((products) => {
            products.push(product);
            localStorage.setItem('books', JSON.stringify(products));
          })
        )
        .subscribe();

      return;
    }

    var updatebooks = JSON.parse(localStorage.getItem('books'));

    updatebooks.forEach(function (item) {
      if (item.id === product.id) {
        item.quantityToBuy++;
        productExistInCart.quantityToBuy += 1;
      }
    });
    localStorage.setItem('books', JSON.stringify(updatebooks));

    //console.log('updatebooks', updatebooks);
    //console.log('itemsNoObs', this.itemsNoObs);
  }

  deleteItemFromCart(product: CartItem, index: number) {
    var del: boolean = true;
    this.decresePrice(product, del);

    this.items$.subscribe((products) => {
      //console.log('index', index);
      products.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(products));
    });
  }

  reduceCartItems(product: CartItem, index: number) {
    this.items$.subscribe((x) => {
      this.itemsNoObs = x;
    });
    const productExistInCart = this.itemsNoObs.find(
      ({ id }) => id === product.id
    );
    var updatebooks = JSON.parse(localStorage.getItem('books'));
    updatebooks.forEach(function (item) {
      if (item.id === product.id && item.quantityToBuy > 1) {
        item.quantityToBuy--;
        productExistInCart.quantityToBuy -= 1;
      }
    });
    localStorage.setItem('books', JSON.stringify(updatebooks));
    //console.log('updatebooks', updatebooks);

    var del: boolean = false;
    this.decresePrice(product, del);
  }

  increasePrice(product: CartItem) {
    let price = JSON.parse(localStorage.getItem('total'));
    let priceDis = JSON.parse(localStorage.getItem('totalWithDiscount'));

    price = price + product.price;

    if (price >= 100.0) {
      priceDis = price * 0.9;
    } else {
      priceDis = price;
    }

    // console.log('price', price);
    // console.log('priceDis', priceDis);

    localStorage.setItem('total', JSON.stringify(price));
    localStorage.setItem('totalWithDiscount', JSON.stringify(priceDis));

    this.totalSubject.next(price);
    this.totalWithDiscountSubject.next(priceDis);
  }

  decresePrice(product: CartItem, del: boolean) {
    let price = JSON.parse(localStorage.getItem('total'));
    let priceDis = JSON.parse(localStorage.getItem('totalWithDiscount'));

    if (!del) {
      price = price - product.price;
    } else {
      price = price - product.price * product.quantityToBuy;
      //console.log('product.quantityToBuy', product.quantityToBuy);
    }

    if (price >= 100.0) {
      priceDis = price * 0.9;
    } else {
      priceDis = price;
    }

    localStorage.setItem('total', JSON.stringify(price));
    localStorage.setItem('totalWithDiscount', JSON.stringify(priceDis));

    this.totalSubject.next(price);
    this.totalWithDiscountSubject.next(priceDis);
  }
}
