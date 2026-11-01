# AI Mystery Room

Casefile is a responsive mystery investigation app. Players enter a premise, choose a difficulty, inspect suspects and clues, request progressive hints, and make a final accusation. Gemini creates case content; the Express API owns case state and scoring.

## Requirements

- Node.js 20 or newer and npm
- MongoDB running locally or a MongoDB Atlas connection string
- A Google Gemini API key for generating cases

## Local setup

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and `GEMINI_API_KEY`. `GEMINI_MODEL` defaults to `gemini-2.0-flash`.
2. Copy `client/.env.example` to `client/.env` if the API is not at `http://localhost:5000/api`.
3. From the repository root, install the root, client, and server dependencies:

   ```sh
   npm install
   npm --prefix client install
   npm --prefix server install
   npm run dev
   ```

The client runs at `http://localhost:5173`; the API runs at `http://localhost:5000`. Check `GET /api/health` for API status. Production builds use `npm run build`; the backend starts with `npm start` from the server directory or `npm --prefix server start` at the root.

## Difficulty and scoring

| Level | Suspects | Clues | Hints | Correct base |
|---|---:|---:|---:|---:|
| Easy | 3 | 5 | 2 | 100 |
| Medium | 4 | 7 | 3 | 150 |
| Hard | 5 | 9 | 3 | 200 |

Final score is `max(0, correct base + 5 × unique clues discovered − 10 × hints used)`. An incorrect accusation earns no base points. The server calculates and persists the score.

## Deployment

- Deploy `client` to Vercel or another static host with build command `npm run build`, output directory `dist`, and `VITE_API_BASE_URL` set to the deployed API URL plus `/api`. Configure SPA fallback routing to `index.html`.
- Deploy `server` to Render or another Node host with start command `npm start`. Set `MONGODB_URI`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `CLIENT_ORIGIN`, `PORT`, and `NODE_ENV` in the host environment. `CLIENT_ORIGIN` accepts a comma-separated origin list.
- Use a least-privilege MongoDB Atlas user and restrict network access as appropriate. Keep `.env` files out of source control.
- After deployment, exercise a complete case at all three difficulties and verify progress refresh, scoring, and solution gating. No live deployment is included from this workspace.

## API overview

The API follows the contracts in `spec.md`: `POST /api/cases`, `GET /api/cases/:id`, clue discovery, sequential hints, accusation, and results retrieval. Active case serialization excludes the solution and undiscovered clue descriptions. Results are unavailable until an accusation completes the case.

## Limitations

Generation requires a configured Gemini API key and an available MongoDB service. AI output is schema-checked and retried once, but schema checks cannot guarantee perfect story logic. The initial release has no accounts or case ownership tokens: case IDs should not be treated as authentication for a public production service. Add ownership/session controls and operational monitoring before broad public use. Hosting and Gemini usage may incur charges.
