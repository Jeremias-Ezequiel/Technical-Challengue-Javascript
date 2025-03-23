import fs from "node:fs/promises";
import path from "node:path";

export async function loadFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error loading the file: ", error);
    return [];
  }
}

export async function updateFile(newItem, filePath) {
  const arrayItems = await loadFile(filePath);
  arrayItems.push(newItem);

  await fs.writeFile(filePath, JSON.stringify(arrayItems), "utf-8");
}
