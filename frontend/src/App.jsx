import { useState } from 'react'
import './App.css'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
import { ProductDetail } from './components/ProductDetail'
import { useEffect } from 'react'
import { api } from './api/client'

function App() {
  const [view, setView] = useState('products'); // 'products', 'cart', 'detail'
  const [detailId, setDetailId] = useState(null);
  const [cart, setCart] = useState({ items: [] });
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = async (productId, qty) => {
    await api.addToCart(productId, qty);
    await refreshCart();
  };

  const updateQty = async (productId, newQty) => {
    const current = cart.items.find((i) => i.id === productId)?.qty || 0;
    if (newQty <= 0) return removeFromCart(productId);
    if (newQty > current) {
      await api.addToCart(productId, newQty - current);
    } else if (newQty < current) {
      await api.removeFromCart(productId, current - newQty);
    }
    await refreshCart();
  };

  const removeFromCart = async (productId) => {
    await api.removeFromCart(productId);
    await refreshCart();
  };

  const handleCheckoutConfirm = async () => {
    const receipt = await api.checkout({});
    await refreshCart();
    return receipt;
  };

  const refreshCart = async () => {
    const data = await api.getCart();
    // backend returns { items:[{id,name,price,qty}], total }
    setCart({ items: data.items || [] });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 dark:text-gray-100">
      <header className="border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-900/70">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600" />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Vibe Commerce</h1>
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setView('products')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition ${view === 'products' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}`}
            >
              Products
            </button>
            <button
              onClick={() => setView('cart')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition relative ${view === 'cart' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}`}
            >
              Cart
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {cart.items.reduce((sum, it) => sum + (it.qty || 0), 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => setDark((v) => !v)}
              className="px-3 py-2 rounded-md text-sm font-medium transition text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {dark ? '🌙' : '☀️'}
            </button>
            <div className="flex items-center gap-2 pl-2 ml-2 border-l border-gray-200 dark:border-gray-800">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold">DU</div>
              <span className="hidden sm:block text-sm font-medium">Demo User</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {view === 'products' && <Products onAddToCart={addToCart} onOpenDetail={(id) => { setDetailId(id); setView('detail'); }} />}
        {view === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onCheckout={() => setShowCheckout(true)}
          />
        )}
        {view === 'detail' && detailId && (
          <ProductDetail
            productId={detailId}
            onBack={() => setView('products')}
            onAddToCart={addToCart}
          />)
        }
      </main>

      {showCheckout && (
        <Checkout
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckoutConfirm}
        />
      )}
    </div>
  )
}

export default App
