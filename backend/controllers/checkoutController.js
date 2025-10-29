import { clearCart, getCartForUser } from "../services/cartService.js";

const DEMO_USER = "demo";

export async function checkout(req, res) {
  const { cartItems } = req.body || {};

  let items;
  if (Array.isArray(cartItems) && cartItems.length) {
    items = cartItems.map((it) => ({ price: Number(it.price || 0), qty: Number(it.qty || 0) }));
  } else {
    const { items: serverItems } = await getCartForUser(DEMO_USER);
    items = serverItems.map((it) => ({ price: it.price, qty: it.qty }));
  }

  const total = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
  const receipt = {
    total,
    timestamp: new Date().toISOString(),
    message: "Mock checkout successful",
  };

  await clearCart(DEMO_USER);

  return res.json(receipt);
}


