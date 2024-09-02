import { Router } from "express";
import { shortenURL } from "../controllers/URLController";
import { shortURL } from "../controllers/URLController";
import { getURLs } from "../controllers/URLController";

export const router = Router();

router.post("/url", shortenURL);
router.get("/url/:shortURL", shortURL);
router.get("/url", getURLs);

export default router;
