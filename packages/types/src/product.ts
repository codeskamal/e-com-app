export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  vendorId: string;
  categoryId: string;
  inventory: number;
  images: string[];
  createdAt: Date;
}
