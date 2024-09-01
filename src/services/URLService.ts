import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { url } from "../modules/urldto";

const prisma = new PrismaClient();

// POST /api/url
export const URLDBCreate = (originalURL: string) => {
  try {
    return prisma.url.create({
      data: { originalUrl: originalURL, shortUrl: nanoid(6) },
    });
  } catch (error) {
    console.error("Error creating URL in database", error);
  }
};

// GET /:shortURL
export const URLDBGet = (shortURL: string): url => {
  try {
    return prisma.url.findUnique({
      where: { shortUrl: shortURL },
      select: { originalUrl: true, shortUrl: true },
    });
  } catch (error) {
    console.error("Error getting URL from database", error);
  }
};
