import mongoose from "mongoose";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export function ensureObjectId(id) {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch {
    return null;
  }
}

export async function getCartForUser(userId) {
  const cart = await Cart.findOne({ userId }).populate("items.product").lean();
  const items = (cart?.items || [])
    .filter((it) => it.product && it.product._id)
    .map((it) => ({
      id: it.product._id.toString(),
      name: it.product.name,
      price: it.product.price,
      qty: it.qty,
    }));
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  return { items, total };
}

export async function addToCart(userId, productId, qty) {
  const productObjectId = ensureObjectId(productId);
  const quantity = Number(qty || 1);
  if (!productObjectId || !(quantity > 0)) {
    const err = new Error("Invalid productId or qty");
    err.status = 400;
    throw err;
  }

  // Ensure product exists before adding
  const exists = await Product.exists({ _id: productObjectId });
  if (!exists) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId } },
    { upsert: true, new: true }
  );

  const existing = cart.items.find((i) => i.product.toString() === productObjectId.toString());
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.items.push({ product: productObjectId, qty: quantity });
  }
  await cart.save();
  return { ok: true };
}

export async function removeFromCart(userId, productId, qty) {
  const productObjectId = ensureObjectId(productId);
  if (!productObjectId) {
    const err = new Error("Invalid id");
    err.status = 400;
    throw err;
  }

  const quantity = qty == null ? null : Number(qty);

  // If no qty provided, remove entire line
  if (!(quantity > 0)) {
    await Cart.updateOne(
      { userId },
      { $pull: { items: { product: productObjectId } } }
    );
    return { ok: true };
  }

  // Decrement qty, and remove if reached 0
  const cart = await Cart.findOne({ userId });
  if (!cart) return { ok: true };

  const item = cart.items.find((i) => i.product.toString() === productObjectId.toString());
  if (!item) return { ok: true };

  item.qty -= quantity;
  if (item.qty <= 0) {
    cart.items = cart.items.filter((i) => i.product.toString() !== productObjectId.toString());
  }
  await cart.save();
  return { ok: true };
}

export async function clearCart(userId) {
  await Cart.updateOne({ userId }, { $set: { items: [] } });
}


