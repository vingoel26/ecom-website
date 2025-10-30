import { Router } from "express";
import { getCart, addItem, removeItem } from "../controllers/cartController.js";
import { validateAddToCart, validateRemoveFromCart } from "../middleware/validate.js";

const router = Router();

router.get("/", getCart);
router.post("/", validateAddToCart, addItem);
router.delete("/", validateRemoveFromCart, removeItem);

export default router;


