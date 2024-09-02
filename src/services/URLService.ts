import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

// POST /api/url
export const URLDBCreate = async (originalURL: string) => {

  try {
    return await prisma.url.create({
      data: { originalUrl: originalURL, shortUrl: nanoid(4)},
      select : { originalUrl: true, shortUrl: true }
    });
    
  } catch (error) {
    console.error("Error creating URL in database", error);
  }
};

// GET /:shortURL
export const URLDBGet = async (shortURL: string)  => {

  try {
    return await prisma.url.findUnique({
      where: { shortUrl: shortURL },
      select: { originalUrl: true, shortUrl: true },
    });
  } catch (error) {
    console.error("Error getting URL from database", error);
  }
};
