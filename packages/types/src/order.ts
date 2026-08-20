export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
}
