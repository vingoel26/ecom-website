import { Product } from "../models/Product.js";

export async function getAllProducts() {
  const products = await Product.find({}).lean();
  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl || "",
    category: p.category || "",
    rating: p.rating || { rate: 0, count: 0 },
  }));
}

export async function getProductById(id) {
  const p = await Product.findById(id).lean();
  if (!p) return null;
  return {
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl || "",
    description: p.description || "",
    category: p.category || "",
    rating: p.rating || { rate: 0, count: 0 },
  };
}


