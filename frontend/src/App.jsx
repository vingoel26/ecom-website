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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Vibe Commerce</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setView('products')}
              className={`px-4 py-2 rounded ${view === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Products
            </button>
            <button
              onClick={() => setView('cart')}
              className={`px-4 py-2 rounded relative ${view === 'cart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Cart
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.reduce((sum, it) => sum + (it.qty || 0), 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main>
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
