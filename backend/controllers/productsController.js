import { getAllProducts } from "../services/productService.js";

export async function listProducts(req, res) {
  const products = await getAllProducts();
  res.json(products);
}


