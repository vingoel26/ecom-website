import { addToCart, getCartForUser, removeFromCart } from "../services/cartService.js";

const DEMO_USER = "demo";

export async function getCart(req, res) {
  const data = await getCartForUser(DEMO_USER);
  res.json(data);
}

export async function addItem(req, res) {
  const { productId, qty } = req.body || {};
  try {
    const result = await addToCart(DEMO_USER, productId, qty);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Failed to add" });
  }
}

export async function removeItem(req, res) {
  try {
    const result = await removeFromCart(DEMO_USER, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Failed to remove" });
  }
}


