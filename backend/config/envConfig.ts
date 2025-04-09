import dotenv from 'dotenv';
dotenv.config();

export const API_KEY = process.env.OMDB_API_KEY
export const OMDB_URI = process.env.OMDB_URI
export const PORT = process.env.PORT
export const ORIGIN_URL = process.env.ORIGIN_URL