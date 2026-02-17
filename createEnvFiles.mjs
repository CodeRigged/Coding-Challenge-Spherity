// This script copies .env.example to .env if .env does not exist
import { promises as fs } from "fs";
import path from "path";

const packages = ["backend", "frontend"];

async function ensureEnv(pkg) {
  const dir = path.resolve(process.cwd(), pkg);
  const envPath = path.join(dir, ".env");
  const examplePath = path.join(dir, ".env.example");

  try {
    await fs.access(envPath);
    return;
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  try {
    await fs.access(examplePath);
    await fs.copyFile(examplePath, envPath);
    console.log(`[create-env] Created ${pkg}/.env from .env.example`);
  } catch (err) {
    console.warn(`[create-env] ${pkg}: ${err.message}`);
  }
}

await Promise.all(packages.map(ensureEnv));
