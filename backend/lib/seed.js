import { Product } from "../models/Product.js";

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) return;

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const mapped = (Array.isArray(data) ? data : []).slice(0, 20).map((p) => ({
      name: p.title?.toString().slice(0, 80) || "Product",
      price: Number(p.price) || 0,
      imageUrl: typeof p.image === 'string' ? p.image : "",
      description: typeof p.description === 'string' ? p.description : "",
      category: typeof p.category === 'string' ? p.category : "",
      rating: {
        rate: typeof p.rating?.rate === 'number' ? p.rating.rate : 0,
        count: typeof p.rating?.count === 'number' ? p.rating.count : 0,
      },
    }));
    if (mapped.length) {
      await Product.insertMany(mapped);
      console.log(`Seeded ${mapped.length} products from Fake Store API`);
      return;
    }
  } catch (e) {
    console.warn("Failed to seed from Fake Store API, falling back to defaults");
  }

  const fallback = [
    { name: "Tee", price: 19.99, imageUrl: "", description: "Soft cotton tee", category: "clothing", rating: { rate: 4.2, count: 37 } },
    { name: "Hoodie", price: 39.99, imageUrl: "", description: "Cozy hoodie", category: "clothing", rating: { rate: 4.6, count: 21 } },
    { name: "Mug", price: 9.99, imageUrl: "", description: "Ceramic mug", category: "home", rating: { rate: 4.0, count: 10 } },
    { name: "Cap", price: 14.99, imageUrl: "", description: "Classic cap", category: "clothing", rating: { rate: 3.9, count: 15 } },
    { name: "Tote", price: 12.49, imageUrl: "", description: "Reusable tote", category: "accessories", rating: { rate: 4.1, count: 8 } },
    { name: "Stickers", price: 4.99, imageUrl: "", description: "Sticker pack", category: "accessories", rating: { rate: 4.8, count: 52 } },
  ];
  await Product.insertMany(fallback);
  console.log(`Seeded ${fallback.length} fallback products`);
}


