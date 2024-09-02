import { Request, Response } from "express";
import { URLDBCreate, URLDBGet, URLDBGetAll } from "../services/URLService";

export const shortenURL = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }
  try {
    const urlCreated = await URLDBCreate(url);

    return res.status(201).json(urlCreated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const shortURL = async (req: Request, res: Response) => {
  const { shortURL } = req.params;
  if (!shortURL) {
    return res.status(400).json({ message: "Short URL is required" });
  }
  try {
    const urlget = await URLDBGet(shortURL);
    if (!urlget) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.redirect(urlget.originalUrl);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getURLs = async (req: Request, res: Response) => {
  try {
    const urls = await URLDBGetAll();
    return res.status(200).json(urls);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
