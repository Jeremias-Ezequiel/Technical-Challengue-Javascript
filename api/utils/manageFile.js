import fs from "node:fs/promises";
import path from "node:path";
import { Log } from "./manageLogFile.js";

export async function loadFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    Log(`File reading successfully: ${filePath}`);
    return JSON.parse(data);
  } catch (error) {
    Log(`EROR - Error reading the following file path: ${filePath}`);
    return [];
  }
}

export async function updateFile(newItem, filePath) {
  const arrayItems = await loadFile(filePath);
  arrayItems.push(newItem);

  await fs.writeFile(filePath, JSON.stringify(arrayItems), "utf-8");
  Log("File update successfully");
}
