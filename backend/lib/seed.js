import { Product } from "../models/Product.js";

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  const items = [
    { name: "Tee", price: 19.99},
    { name: "Hoodie", price: 39.99},
    { name: "Mug", price: 9.99},
    { name: "Cap", price: 14.99},
    { name: "Tote", price: 12.49},
    { name: "Stickers", price: 4.99},
  ];
  await Product.insertMany(items);
  console.log(`Seeded ${items.length} products`);
}


