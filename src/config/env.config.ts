import "dotenv/config";

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const DEVELOP_DB_HOST = process.env.DEVELOP_DB_HOST;
export const DEVELOP_DB_PORT = process.env.DEVELOP_DB_PORT;
export const DEVELOP_DB_USERNAME = process.env.DEVELOP_DB_USERNAME;
export const DEVELOP_DB_PASSWORD = process.env.DEVELOP_DB_PASSWORD;
export const DEVELOP_DB_NAME = process.env.DEVELOP_DB_NAME;

export const RESTART_SCHEMA = true;
