import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getProducts();
        if (mounted) setProducts(data || []);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Products</h2>
        {loading && <span className="text-sm text-gray-500">Loading…</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700">
                {product.name}
              </h3>
              <span className="text-sm font-semibold text-gray-900">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => onAddToCart(product.id, 1)}
                className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

