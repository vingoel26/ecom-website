import { Router } from "express";
import { getCart, addItem, removeItem } from "../controllers/cartController.js";

const router = Router();

router.get("/", getCart);
router.post("/", addItem);
router.delete("/:id", removeItem);

export default router;


