// src/store/products.ts

export interface Product {
  id: number;
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
// helper to ensure 4 duplicated images
const four = (img: string) => Array(4).fill(img);

export const products: Product[] = [
  {
    id: 0,
    name: "Men's Casual Sneakers",
    breadcrumb: "Men / Shoes",
    images: four(
      "https://i.pinimg.com/1200x/9d/be/6a/9dbe6a288dd99d451fd5b3a2fd5881cf.jpg",
    ),
    price: 79,
    oldPrice: 99,
    category: "shoes",
    description: "Comfortable everyday sneakers with breathable fabric.",
    sku: "SNK-001",
    availability: "In Stock",
  },
  {
    id: 1,
    name: "Men's Casual Sneakers",
    breadcrumb: "Men / Shoes",
    images: four(
      "https://i.pinimg.com/1200x/93/2b/98/932b986e54a77be6ec5813b95e5454c3.jpg",
    ),
    price: 79,
    oldPrice: 99,
    category: "shoes",
    description: "Comfortable everyday sneakers with breathable fabric.",
    sku: "SNK-002",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "Men's Casual Sneakers",
    breadcrumb: "Men / Shoes",
    images: four(
      "https://i.pinimg.com/1200x/d2/5c/26/d25c265c63c07a3ae081c1dc51cff9d3.jpg",
    ),
    price: 79,
    oldPrice: 99,
    category: "shoes",
    description: "Comfortable everyday sneakers with breathable fabric.",
    sku: "SNK-003",
    availability: "In Stock",
  },
  {
    id: 3,
    name: "Men's Casual Sneakers",
    breadcrumb: "Men / Shoes",
    images: four(
      "https://i.pinimg.com/736x/57/0c/5a/570c5a69781b17b3e0eec85311f78f33.jpg",
    ),
    price: 79,
    oldPrice: 99,
    category: "shoes",
    description: "Comfortable everyday sneakers with breathable fabric.",
    sku: "SNK-004",
    availability: "In Stock",
  },

  {
    id: 4,
    name: "Elegant Women Handbag",
    breadcrumb: "Women / Bags",
    images: four(
      "https://i.pinimg.com/736x/9e/4f/ad/9e4fad34fc3f5bf2d1f1915cea1a317c.jpg",
    ),
    price: 65,
    oldPrice: 85,
    category: "bags",
    description: "Stylish handbag crafted for elegance.",
    sku: "BAG-001",
    availability: "In Stock",
  },
  {
    id: 5,
    name: "Luxury Watch",
    breadcrumb: "Accessories / Watches",
    images: four(
      "https://i.pinimg.com/736x/a6/86/8f/a6868f8f9dd1314931021884b4a9d6fd.jpg",
    ),
    price: 120,
    category: "watches",
    description: "Elegant watch suitable for any occasion.",
    sku: "WT-001",
    availability: "In Stock",
  },
  {
    id: 6,
    name: "Women Summer Dress",
    breadcrumb: "Women / Dresses",
    images: four(
      "https://i.pinimg.com/1200x/d6/e4/bb/d6e4bba33d2b6a56d6f2c1ce8c256dfb.jpg",
    ),
    price: 55,
    oldPrice: 70,
    category: "dresses",
    description: "Light and breezy summer dress.",
    sku: "DR-001",
    availability: "In Stock",
  },
  {
    id: 7,
    name: "Men Streetwear Jacket",
    breadcrumb: "Men / Fashion",
    images: four(
      "https://i.pinimg.com/1200x/5a/1b/94/5a1b94a84eaf2dda6fd7406d24f1a79b.jpg",
    ),
    price: 95,
    category: "jackets",
    description: "Trendy streetwear jacket for men.",
    sku: "JK-001",
    availability: "In Stock",
  },
];
