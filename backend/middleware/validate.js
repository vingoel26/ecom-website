import mongoose from "mongoose";

export function validateAddToCart(req, res, next) {
  const { productId, qty } = req.body || {};
  if (!productId || !mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ error: "Invalid productId" });
  }
  if (qty != null && !(Number(qty) > 0)) {
    return res.status(400).json({ error: "qty must be a positive number" });
  }
  next();
}

export function validateRemoveFromCart(req, res, next) {
  const { productId, qty } = req.body || {};
  if (!productId || !mongoose.isValidObjectId(productId)) {
    return res.status(400).json({ error: "Invalid productId" });
  }
  if (qty != null && !(Number(qty) > 0)) {
    return res.status(400).json({ error: "qty must be a positive number" });
  }
  next(); 
}


