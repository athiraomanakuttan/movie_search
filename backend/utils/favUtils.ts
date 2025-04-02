import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { MovieType } from "../types/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAVORITES_FILE = path.join(__dirname, "favorites.json");

export const readFavorites = () => {
    if (!fs.existsSync(FAVORITES_FILE)) return [];
    return JSON.parse(fs.readFileSync(FAVORITES_FILE, "utf8"));
};

export const writeFavorites = (favorites: MovieType) => {
    fs.writeFileSync(FAVORITES_FILE, JSON.stringify(favorites, null, 2));
};