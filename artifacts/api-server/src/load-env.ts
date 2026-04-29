import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../..");
const isProd = process.env["NODE_ENV"] === "production";

if (isProd) {
  config({ path: path.join(repoRoot, ".env.production") });
} else {
  config({ path: path.join(repoRoot, ".env") });
  config({ path: path.join(repoRoot, ".env.local"), override: true });
}
