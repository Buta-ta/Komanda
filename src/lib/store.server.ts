import { readFileSync, writeFileSync } from "fs";
import path from "path";
import fallback from "../../data/store.json";
import type { Store } from "./catalog";

const FILE = path.join(process.cwd(), "data/store.json");

export function readStore(): Store {
  try {
    return JSON.parse(readFileSync(FILE, "utf8")) as Store;
  } catch {
    return fallback as Store;
  }
}

export function writeStore(data: Store) {
  writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
}
