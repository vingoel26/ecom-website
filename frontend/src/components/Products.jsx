import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";

export function Products({ onAddToCart, onOpenDetail }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  const categories = useMemo(() => {
    const set = new Set();
    for (const p of products) {
      if (p.category) set.add(p.category);
    }
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = q ? (p.name?.toLowerCase().includes(q)) : true;
      const matchesCat = category === "all" ? true : (p.category === category);
      return matchesQuery && matchesCat;
    });
  }, [products, search, category]);

  return (
    <section className="">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Products</h2>
        <div className="flex-1 sm:max-w-md sm:ml-auto flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="flex-1 rounded-md border px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-800"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-800"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="min-w-[60px] text-right">
          {loading && <span className="text-sm text-gray-500">Loading…</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-gray-900 dark:border-gray-800"
          >
            {product.imageUrl && (
              <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 w-full h-48 flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300">
                <button onClick={() => onOpenDetail(product.id)} className="text-left hover:underline">
                  {product.name}
                </button>
              </h3>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
            {product.category && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
            )}
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

