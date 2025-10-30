import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);


