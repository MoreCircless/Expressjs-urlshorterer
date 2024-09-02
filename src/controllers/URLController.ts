import { Request, Response } from "express";
import { URLDBCreate, URLDBGet } from "../services/URLService";


export const shortenURL = (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }
  try {
    return URLDBCreate(url);}
  catch (error) {
   return res.status(500).json({ message: "Internal server error" });
}};


export const shortURL = (req: Request, res: Response) => {
  const { shortURL } = req.params;
  if (!shortURL) {
    return res.status(400).json({ message: "Short URL is required" });
  } 
  try { 
    const urlget = URLDBGet(shortURL);
    res.redirect(urlget.originalUrl);
  } 
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  }
