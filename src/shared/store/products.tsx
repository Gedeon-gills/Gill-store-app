export interface Product {
  id: string;
  name: string;
  breadcrumb: string;
  images: string[]; // always 4 images
  price: number;
  oldPrice?: number;
  priceDown?: number; // optional
  category: string;
  description: string;
  sku: string;
  availability: "In Stock" | "Out of Stock";
  owner?: string; // optional
  date?: string; // optional
}
