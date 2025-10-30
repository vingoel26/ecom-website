import { getAllProducts, getProductById } from "../services/productService.js";

export async function listProducts(req, res) {
  const products = await getAllProducts();
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}


