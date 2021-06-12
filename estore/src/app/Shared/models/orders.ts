import Product from "./products";

export default class Orders{
  TrackingID: string;
  CustomerName: string;
  CustomerEmail: string;
  CustomerPhone: string;
  orderDate: string;
  ShippingAddress: string;
  products: Array<Product>;
  orderStatus: string;
  Total: number;
}
