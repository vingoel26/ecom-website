import { useState } from 'react'
import './App.css'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
import { useEffect } from 'react'
import { api } from './api/client'

function App() {
  const [view, setView] = useState('products'); // 'products', 'cart'
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

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600" />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Vibe Commerce</h1>
          </div>
          <nav className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setView('products')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition ${view === 'products' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Products
            </button>
            <button
              onClick={() => setView('cart')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition relative ${view === 'cart' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Cart
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {cart.items.reduce((sum, it) => sum + (it.qty || 0), 0)}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {view === 'products' && <Products onAddToCart={addToCart} />}
        {view === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onCheckout={() => setShowCheckout(true)}
          />
        )}
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
