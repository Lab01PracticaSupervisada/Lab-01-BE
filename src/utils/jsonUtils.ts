import fs from 'fs';
import path from 'path';

import { Curso } from '../models/curso.js';

const jsonPath = path.join(process.cwd(), 'src/data/data.json');

export const readJsonFile = (): Curso[] => {
  try {
    const data = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return [];
  }
};

export const writeJsonFile = (data: Curso[]): void => {
  try {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
};

export const cleanData = (): void => {
  try {
    fs.writeFileSync(jsonPath, '[]', 'utf-8');
  } catch (error) {
    console.error('Error cleaning JSON file:', error);
  }
};
