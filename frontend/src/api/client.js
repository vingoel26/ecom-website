export const API_BASE_URL = "http://localhost:3000";

async function http(method, path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  getProducts() {
    return http("GET", "/api/products");
  },
  getCart() {
    return http("GET", "/api/cart");
  },
  addToCart(productId, qty = 1) {
    return http("POST", "/api/cart", { productId, qty });
  },
  removeFromCart(productId, qty) {

    return http("DELETE", "/api/cart", qty == null ? { productId } : { productId, qty });
  },
  checkout(payload = {}) {
    return http("POST", "/api/checkout", payload);
  },
};
