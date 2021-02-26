import { Component, OnInit } from '@angular/core';
import { BookListService } from 'src/app/Services/book-list.service';
import { CartService } from 'src/app/Services/cart.service';
import { Book } from 'src/assets/Book';
import { CartItem } from 'src/assets/CartItem';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private bookListService: BookListService,
    private cartService: CartService
  ) {}

  books: Book[];
  cartProductList: CartItem[] = [];
  items$ = this.cartService.items$;
  //totalPrice$ = this.cartService.items$.;

  ngOnInit(): void {
    // Show BookList
    this.bookListService.getBooks().subscribe((data) => {
      this.books = data;
      //console.log(data);
    });
  }

  addProductToCart(product: Book) {
    let bookToCartProduct: CartItem = {
      id: product.id,
      image: product.image,
      title: product.title,
      author: product.author,
      price: product.price,
    };

    this.cartProductList.push(bookToCartProduct);
    //console.log('cartProductList', this.cartProductList);

    this.cartService.addToCart(bookToCartProduct);
  }
}
