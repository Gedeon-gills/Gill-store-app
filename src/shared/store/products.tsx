interface ProductsIn {
  name: string;
  description: string;
  Image: string[];
  price: number;
  priceDown?: number;
}
export const products: ProductsIn[] = [
  {
    name: "Men's Casual Sneakers",
    description: "Men / Shoes",
    Image: [
      "https://i.pinimg.com/1200x/04/4c/ca/044cca18d3dd80893d340835f62e7dfa.jpg",
      "https://i.pinimg.com/1200x/26/32/af/2632afa89d8d9c40b9a15f3ed6b9b3fb.jpg",
    ],
    price: 79,
    priceDown: 99,
  },
  {
    name: "Elegant Women Handbag",
    description: "Women / Bags",
    Image: [
      "https://i.pinimg.com/736x/eb/26/cf/eb26cf83675fa068929c42352ab75a58.jpg",
      "https://i.pinimg.com/736x/27/42/bd/2742bdee536bf47894c9436c74c042e2.jpg",
    ],
    price: 65,
    priceDown: 85,
  },
  {
    name: "Luxury Gold Watch",
    description: "Accessories / Watches",
    Image: [
      "https://i.pinimg.com/736x/a6/86/8f/a6868f8f9dd1314931021884b4a9d6fd.jpg",
      "https://i.pinimg.com/736x/94/f1/e4/94f1e48789ab0070e54e1431d725259c.jpg",
    ],
    price: 120,
  },
  {
    name: "Women Summer Dress",
    description: "Women / Dresses",
    Image: [
      "https://i.pinimg.com/736x/94/f1/e4/94f1e48789ab0070e54e1431d725259c.jpg",
      "https://i.pinimg.com/736x/87/67/39/8767399856b5c7278c7dbb759eb88b16.jpg",
    ],
    price: 55,
    priceDown: 70,
  },
  {
    name: "Men Streetwear Jacket",
    description: "Men / Fashion",
    Image: [
      "https://i.pinimg.com/1200x/ee/31/d4/ee31d4570e0c161eb42d306152447737.jpg",
      "https://i.pinimg.com/736x/f7/c6/2f/f7c62f557de1715e8c478a48fd8b2842.jpg",
    ],
    price: 95,
  },
];
