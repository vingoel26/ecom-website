import { useEffect, useState } from "react";
import { api } from "../api/client";

export function ProductDetail({ productId, onBack, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getProduct(productId);
        if (mounted) setProduct(data);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load product");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [productId]);

  if (loading) return <div className="text-gray-500">Loading…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl overflow-hidden border bg-white dark:bg-gray-900 dark:border-gray-800">
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        )}
      </div>
      <div>
        <button onClick={onBack} className="text-sm text-blue-600 hover:underline mb-4">← Back</button>
        <h1 className="text-2xl text-black font-semibold mb-2">{product.name}</h1>
        <p className="text-lg font-semibold mb-2 text-gray-600">₹{product.price.toFixed(2)}</p>
        {product.category && <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>}
        {product.rating && (
          <p className="text-sm text-gray-600 mb-4">Rating: {product.rating.rate} ({product.rating.count})</p>
        )}
        {product.description && <p className="text-gray-700 mb-6">{product.description}</p>}

        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(product.id, 1)}
            className="rounded-md bg-blue-600 text-white px-5 py-2 hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}


