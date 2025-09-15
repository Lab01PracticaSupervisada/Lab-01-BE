import fs from "fs";
import path from "path";
import { Curso } from "#models/curso.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file's path from import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename);

const jsonPath = path.resolve(__dirname, "../data/data.json");

export const readJsonFile = (): Curso[] => {
    try {
        const data = fs.readFileSync(jsonPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return [];
    }  
};

export const writeJsonFile = (data: Curso[]): void => {
    try {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing JSON file:", error);
    }
};

