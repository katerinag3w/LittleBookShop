import { CartItem } from './CartItem';

export interface Order {
  books: CartItem[];
  price: number;
  priceAfterDiscount: number;
}
