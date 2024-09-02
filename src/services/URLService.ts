import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

// POST /api/url
export const URLDBCreate = async (originalURL: string) => {
  try {
    if (!isValidURL(originalURL)) {
      return { message: "Invalid URL" };
    }
    if ((await checkServiceURL(originalURL)) === false) {
      return { message: "URL not found" };
    }
    return await prisma.url.create({
      data: { originalUrl: originalURL, shortUrl: nanoid(4) },
      select: { originalUrl: true, shortUrl: true },
    });
  } catch (error) {
    console.error("Error creating URL in database", error);
  }
};

// GET /:shortURL
export const URLDBGet = async (shortURL: string) => {
  try {
    return await prisma.url.findUnique({
      where: { shortUrl: shortURL },
      select: { originalUrl: true, shortUrl: true },
    });
  } catch (error) {
    console.error("Error getting URL from database", error);
  }
};

// GET /api/url RETURN ALL URLS
export const URLDBGetAll = async () => {
  try {
    return await prisma.url.findMany({
      select: { originalUrl: true, shortUrl: true },
    });
  } catch (error) {
    console.error("Error getting URL from database", error);
  }
};

function isValidURL(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

async function checkServiceURL(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
