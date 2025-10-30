export function Cart({ cart, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-gray-600">Your cart is empty</div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border bg-white p-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <p className="w-20 text-right font-semibold text-gray-900">₹{(item.price * item.qty).toFixed(2)}</p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-600 hover:text-red-700 px-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-lg sm:text-xl font-semibold text-gray-900">Total: ₹{total.toFixed(2)}</span>
            <button
              onClick={onCheckout}
              className="rounded-md bg-green-600 text-white py-2 px-6 shadow-sm hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}

