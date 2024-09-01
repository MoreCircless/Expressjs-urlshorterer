import { Router } from "express";
import { shortenURL } from "../controllers/URLController";
import { shortURL } from "../controllers/URLController";

export const router = Router();

router.post("/URL", shortenURL);
router.get("/:shortURL", shortURL);

export default router;
