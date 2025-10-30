import 'dotenv/config';
import express from "express";
import cors from "cors";
import { connectDatabase } from "./lib/db.js";
import { seedProductsIfEmpty } from "./lib/seed.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import checkoutRouter from "./routes/checkout.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);

// 404 and error handling
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

async function start() {
  await connectDatabase();
  await seedProductsIfEmpty();
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});