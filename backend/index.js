import 'dotenv/config';
import express from "express";
import cors from "cors";
import { connectDatabase } from "./lib/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});