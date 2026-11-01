import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const envPath = fileURLToPath(new URL('../../.env', import.meta.url));
const result = dotenv.config({ path: envPath });

if (result.error && result.error.code !== 'ENOENT') {
  console.error(`Could not load server environment file at ${envPath}: ${result.error.message}`);
}

if (!process.env.GEMINI_API_KEY?.trim()) {
  console.warn(`Gemini generation is not configured: GEMINI_API_KEY is missing or empty in ${envPath}.`);
}
