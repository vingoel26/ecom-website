import { Product } from "../models/Product.js";

export async function getAllProducts() {
  const products = await Product.find({}).lean();
  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    description: p.description,
    imageUrl: p.imageUrl,
  }));
}


