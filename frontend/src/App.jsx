import { useState, useEffect } from 'react'
import './App.css'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
import { ProductDetail } from './components/ProductDetail'
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
    setCart({ items: data.items || [] });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600" />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">Vibe Commerce</h1>
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
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
            <div className="flex items-center gap-2 pl-2 ml-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold">DU</div>
              <span className="hidden sm:block text-sm font-medium">Demo User</span>
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6 bg-white text-gray-900">
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
