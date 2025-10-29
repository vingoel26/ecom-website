import { useState } from "react";

export function Checkout({ cart, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit({ name, email });
    setReceipt(result);
    setShowReceipt(true);
  };

  if (showReceipt && receipt) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Receipt</h2>
          <div className="space-y-2 mb-4">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Total:</strong> ₹{receipt.total.toFixed(2)}</p>
            <p><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
            <p className="text-green-600 font-medium">{receipt.message}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full rounded-md bg-blue-600 text-white py-2 px-4 shadow-sm hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            />
          </div>
          
          <div className="border-t pt-4">
            <p className="text-lg font-semibold mb-4">Total: ₹{total.toFixed(2)}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md bg-gray-200 text-gray-800 py-2 px-4 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-green-600 text-white py-2 px-4 hover:bg-green-700 transition"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

