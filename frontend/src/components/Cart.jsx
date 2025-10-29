export function Cart({ cart, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 border-b pb-2 mb-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="w-20 text-right font-semibold">
                  ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                  
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total: ₹{total.toFixed(2)}</span>
            <button
              onClick={onCheckout}
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

