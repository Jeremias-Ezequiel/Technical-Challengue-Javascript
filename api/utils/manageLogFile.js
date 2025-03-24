import fs from "node:fs/promises";
import path from "node:path";

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${month + 1}-${day}`;
}

export function Log(content) {
  const customDate = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(customDate);
  const logPath = path.join("log", `${getDate()}-LOG.txt`);
  fs.appendFile(logPath, `${customDate} - ${content} \n`);
}
