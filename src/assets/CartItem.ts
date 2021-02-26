export interface CartItem {
  id: string;
  image: string;
  title: string;
  author: string;
  price: number;
  quantityToBuy?: number;
}
