# AI Mystery Room — Project Specification

**Version:** 1.0.0  
**Status:** Ready for Implementation  
**Project Type:** AI-Powered Mystery Investigation Web Application

---

## 1. Project Overview

### 1.1 Description

AI Mystery Room is an interactive web application that allows users to create and solve original detective mysteries generated using Google's Gemini API.

Players receive a mystery premise, investigate suspects, discover clues, request hints, and accuse the person they believe committed the crime. The application evaluates their accusation, calculates their score, and reveals the complete solution.

The experience combines AI-generated storytelling, interactive investigation mechanics, logical reasoning, and gamification.

### 1.2 Problem Statement

Traditional mystery games rely on predefined stories, limiting replayability and personalization. AI Mystery Room addresses this limitation by dynamically generating mysteries based on user-provided premises and selected difficulty levels.

The application must ensure that each mystery is engaging, logically consistent, solvable, and fair.

### 1.3 Objectives

- Generate original mysteries using Gemini.
- Provide three difficulty levels with different investigation requirements.
- Enable interactive clue discovery and hint requests.
- Protect the solution from premature disclosure.
- Calculate scores consistently on the backend.
- Deliver a responsive, polished web experience.
- Deploy a fully functional application accessible through a public URL.

### 1.4 Target Users

- Students learning logical reasoning and problem-solving.
- Mystery, detective, and puzzle enthusiasts.
- Casual gamers seeking short interactive experiences.
- Users interested in AI-generated storytelling.

### 1.5 Core User Experience

The experience should feel like entering a detective's investigation room.

Users should be able to understand the case, examine evidence, compare suspects, request assistance, and make an informed accusation without unnecessary navigation.

**Design principle:** The AI creates the mystery, but deterministic application logic controls the investigation and verdict.

---

## 2. Scope and Features

### 2.1 Mandatory Features

| Feature | Description |
|---|---|
| Home page | Introduces the game and provides a start action. |
| Mystery creation | Accepts a premise and difficulty selection. |
| AI generation | Generates a structured mystery through Gemini. |
| Suspect investigation | Displays suspect profiles and relevant information. |
| Clue discovery | Allows players to reveal individual clues. |
| Hint system | Reveals progressive hints with score penalties. |
| Investigation progress | Tracks discovered clues and hints used. |
| Accusation system | Allows players to select and accuse a suspect. |
| Results screen | Displays the verdict, culprit, explanation, and score. |
| Restart | Allows users to create another mystery. |
| Persistent storage | Stores cases and investigation progress in MongoDB. |
| Error handling | Handles invalid input, failed generation, and unavailable cases. |
| Responsive UI | Supports desktop, tablet, and mobile devices. |

### 2.2 Optional Enhancements

These features are outside the mandatory first release:

- User registration and authentication.
- Player profiles and leaderboards.
- Mystery history and saved games.
- Daily challenges.
- Timed investigations.
- Achievements and badges.
- Sound effects and animations.
- Shareable results.
- Multiple languages.
- Multiplayer investigations.

Optional features must not delay delivery of the complete core experience.

---

## 3. Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React | User interface and component architecture |
| Build tool | Vite | Development server and production builds |
| Styling | Tailwind CSS | Responsive styling and design system |
| Routing | React Router | Client-side navigation |
| HTTP client | Fetch API | Frontend-to-backend communication |
| Backend | Node.js | JavaScript runtime |
| API framework | Express.js | REST API and middleware |
| Database | MongoDB | Persistent case storage |
| ODM | Mongoose | Database schemas and validation |
| AI | Google Gemini API | Mystery generation |
| Frontend deployment | Vercel or equivalent | Hosting the React application |
| Backend deployment | Render or equivalent | Hosting the Express API |
| Database hosting | MongoDB Atlas | Managed MongoDB database |

Use compatible, stable package versions when implementation begins.

### 3.1 Project Structure

```text
ai-mystery-room/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── cases.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SuspectCard.jsx
│   │   │   ├── ClueCard.jsx
│   │   │   ├── HintPanel.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateMystery.jsx
│   │   │   ├── InvestigationRoom.jsx
│   │   │   ├── Accusation.jsx
│   │   │   └── Results.jsx
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── gemini.js
│   │   ├── controllers/
│   │   │   └── caseController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   └── Case.js
│   │   ├── routes/
│   │   │   └── caseRoutes.js
│   │   ├── services/
│   │   │   ├── mysteryService.js
│   │   │   └── scoringService.js
│   │   ├── validators/
│   │   │   └── caseValidator.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── SPEC.md
├── README.md
└── .gitignore
```

The exact directory structure may evolve during implementation, but frontend, backend, and business logic must remain clearly separated.

---

## 4. User Journey

### Step 1: Open the Website

The user lands on the home page and sees the application's purpose, a concise explanation, and a prominent **Start Investigating** button.

### Step 2: Create a Mystery

The user enters a premise and selects a difficulty level.

Example premise:

> A priceless diamond disappears from a locked museum room during a private exhibition. Three people had access to the building.

Difficulty options:

- Easy
- Medium
- Hard

The user submits the form to generate a case.

### Step 3: Generate the Case

The frontend displays a loading state while the backend requests a mystery from Gemini.

The backend validates the generated response, verifies its structure and logical requirements, and stores the case.

The client receives only the information necessary to begin the investigation. The culprit, solution, and other restricted fields remain server-side.

### Step 4: Investigate

The investigation room displays:

- Mystery title and introduction.
- Crime scene description.
- Suspect profiles.
- Discoverable clues.
- Investigation progress.
- Available hints.
- Current score or score estimate.
- An action to proceed to accusation.

Players can discover clues individually.

### Step 5: Request Hints

Players can request the next available hint.

Hints must become progressively more informative without directly revealing the culprit.

Each hint reduces the final score by 10 points.

### Step 6: Accuse a Suspect

The player selects a suspect and submits the accusation.

The backend verifies the case state, evaluates the suspect against the stored solution, calculates the score, and marks the case completed.

The player cannot change their accusation after submission.

### Step 7: View Results

The results page displays:

- Correct or incorrect verdict.
- Actual culprit.
- Explanation of the crime.
- How the evidence supports the solution.
- Discovered clue count.
- Hints used.
- Final score.
- Option to start another mystery.

The complete solution is revealed only after the accusation has been submitted successfully.

### Step 8: Play Again

The user returns to the creation page and can generate another case with a different premise or difficulty.

---

## 5. Page and UI Specifications

### 5.1 Home Page

**Route:** `/`

**Purpose:** Introduce the experience and encourage users to start.

**Required elements:**

- Application logo and navigation.
- Headline introducing AI-generated detective mysteries.
- Short descriptive paragraph.
- Primary CTA: Start Investigating.
- Three difficulty indicators.
- Brief explanation of the investigation process.
- Responsive footer.

**Suggested headline:**

"Every Mystery Has a Secret. Can You Find It?"

**Interaction:** The primary CTA navigates to `/create`.

### 5.2 Create Mystery Page

**Route:** `/create`

**Purpose:** Collect the premise and difficulty.

**Required elements:**

- Page title and introductory text.
- Multiline premise input.
- Character count.
- Example premise or suggestion.
- Easy, Medium, and Hard selection cards.
- Generate Mystery button.
- Input validation messages.
- Generation loading state.

**Validation:**

- Premise is required.
- Trim whitespace before validation.
- Minimum premise length: 20 characters.
- Maximum premise length: 500 characters.
- Difficulty must be one of `easy`, `medium`, or `hard`.

**Interaction:** Successful submission creates a case and navigates to `/investigation/:id`.

### 5.3 Investigation Room

**Route:** `/investigation/:id`

**Purpose:** Provide the complete investigation workspace.

**Required elements:**

1. Case title and story introduction.
2. Crime scene details.
3. Suspect cards.
4. Clue discovery panel.
5. Hint panel.
6. Investigation progress indicator.
7. Discovered clue count.
8. Hints-used count.
9. Accusation CTA.

**Suspect cards must show:**

- Name.
- Occupation or role.
- Relationship to the victim or crime.
- Publicly available background.
- Relevant information revealed through investigation.

Suspect profiles must not expose internal solution fields.

**Clue cards must show:**

- Hidden or discovered status.
- Short clue label.
- Clue description after discovery.
- Optional location or evidence category.

Hidden clues must not expose their descriptions through the client API or HTML.

**Progress indicator:**

Display discovered clues against the total number available.

Example: `3 of 7 clues discovered`.

The player may accuse a suspect before discovering every clue. The application should not force full completion unless a future game mode explicitly requires it.

### 5.4 Accusation Page

**Route:** `/accuse/:id`

**Purpose:** Collect the player's final decision.

**Required elements:**

- Case summary.
- Selectable suspect cards or radio options.
- Selected-suspect indicator.
- Confirmation message.
- Submit Accusation button.
- Loading state while the verdict is processed.

**Rules:**

- Exactly one valid suspect must be selected.
- The suspect must belong to the active case.
- Confirmation must make clear that the decision is final.
- Duplicate submissions must not award points more than once.
- A completed case must not accept another accusation.

After successful submission, navigate to `/results/:id`.

### 5.5 Results Page

**Route:** `/results/:id`

**Purpose:** Reveal the outcome and explain the solution.

**Required elements:**

- Verdict banner.
- Player's accusation.
- Actual culprit.
- Final score.
- Base points awarded.
- Clue points earned.
- Hint penalties.
- Solution explanation.
- Evidence supporting the culprit's guilt.
- Explanation of misleading evidence, where applicable.
- Play Again button.

A player who selects the wrong suspect still receives the complete solution after submission.

The results endpoint must not disclose the solution while the case is active.

### 5.6 Global UI States

| State | Expected Behavior |
|---|---|
| Initial loading | Show a skeleton or loading indicator. |
| AI generation | Show progress feedback and prevent duplicate submissions. |
| Empty input | Display a clear validation message. |
| API failure | Display an actionable error and preserve form input. |
| Invalid case ID | Show a not-found page. |
| Missing case | Explain that the case cannot be found. |
| Network failure | Offer retry without falsely reporting success. |
| Duplicate action | Prevent duplicate score changes and repeated state transitions. |
| Completed case | Show the result instead of reopening the investigation. |

### 5.7 Visual Design

Use a modern detective-themed interface.

Suggested direction:

- Dark charcoal or midnight backgrounds.
- Warm ivory text.
- Amber or muted gold accents.
- Evidence-board-inspired layouts.
- Clear typography and restrained shadows.
- Subtle transitions for clue discovery and verdict presentation.

Avoid excessive animations, cluttered dashboards, and text-heavy cards.

### 5.8 Responsive Behavior

**Desktop:** Multi-column investigation workspace with suspects and evidence visible together.

**Tablet:** Two-column layout where space permits.

**Mobile:** Single-column layout, stacked suspect cards, readable clue panels, and full-width primary actions.

All interactive elements must be keyboard-accessible and usable on touchscreens.

---

## 6. Mystery Generation and AI Behavior

### 6.1 Difficulty Configuration

| Difficulty | Suspects | Clues | Hints | Base Correct Score |
|---|---:|---:|---:|---:|
| Easy | 3 | 5 | 2 | 100 |
| Medium | 4 | 7 | 3 | 150 |
| Hard | 5 | 9 | 3 | 200 |

These values are server-controlled constants. The frontend must not determine authoritative difficulty settings or scoring.

### 6.2 Gemini Responsibilities

Gemini must generate:

- Mystery title.
- Story introduction.
- Crime scene description.
- Suspect profiles.
- Suspect identifiers.
- Clues.
- Hint sequence.
- Culprit identifier.
- Solution explanation.
- Evidence-based reasoning.
- Optional misleading evidence.

Gemini generates narrative content. The backend remains responsible for validation, access control, state transitions, and scoring.

### 6.3 Required AI Output Format

Gemini must return a structured JSON object following this schema conceptually:

```json
{
  "title": "The Vanishing Diamond",
  "story": "A diamond vanished during a private exhibition.",
  "crimeScene": "The display room was locked...",
  "suspects": [
    {
      "id": "suspect_1",
      "name": "Mira Chen",
      "role": "Museum curator",
      "background": "She managed the exhibition.",
      "publicAlibi": "She was cataloguing nearby artifacts."
    }
  ],
  "clues": [
    {
      "id": "clue_1",
      "title": "A Broken Seal",
      "description": "A security seal shows signs of tampering.",
      "category": "physical_evidence"
    }
  ],
  "hints": [
    "Compare the timeline with the room's access records."
  ],
  "solution": {
    "culpritId": "suspect_1",
    "explanation": "The curator altered the access records.",
    "reasoning": [
      "The access log contradicts the stated alibi.",
      "The tampered seal is consistent with the timeline."
    ]
  }
}
```

**Important:** The example is illustrative, not a fixed mystery. Production generation must return the configured number of suspects, clues, and hints for the selected difficulty.

### 6.4 Generation Requirements

The AI prompt must instruct Gemini to:

1. Create an original mystery based on the supplied premise.
2. Follow the selected difficulty configuration exactly.
3. Assign unique identifiers to suspects and clues.
4. Select exactly one culprit.
5. Establish a coherent sequence of events.
6. Provide enough evidence to identify the culprit logically.
7. Ensure the solution is consistent with the timeline and suspect information.
8. Avoid contradictions between the story, clues, alibis, and solution.
9. Make hints progressively more informative.
10. Avoid revealing the culprit in public-facing content or hints.
11. Ensure that each required field has the expected type.
12. Return valid structured JSON without unrelated prose.

### 6.5 AI Output Validation

Before a case is stored, the backend must validate:

- Required fields exist.
- Field types are correct.
- Suspect, clue, and hint counts match the selected difficulty.
- All identifiers are unique within their respective collections.
- The culprit identifier matches an existing suspect.
- The reasoning contains supporting evidence.
- Hints do not explicitly name or identify the culprit.
- Content lengths remain within defined limits.
- No unexpected properties are accepted in security-sensitive structures.

Use Gemini's supported structured-output capabilities where available, but always validate the response on the server.

If validation fails, retry generation a limited number of times. If generation remains invalid, return a controlled error without creating an incomplete case.

**Logical quality requirement:** Schema validation alone does not establish that a mystery is solvable. Implement deterministic consistency checks where feasible and evaluate whether the evidence supports the stored solution. Do not claim perfect logical verification from an LLM-generated response.

---

## 7. Backend Architecture

### 7.1 Architectural Responsibilities

**Express routes:** Define HTTP endpoints.

**Controllers:** Parse requests, invoke services, and return HTTP responses.

**Mystery service:** Generate and validate cases through Gemini.

**Scoring service:** Calculate points using trusted server-side data.

**Mongoose model:** Enforce database-level structural validation.

**Middleware:** Handle validation errors, rate limits, authentication if introduced, and unexpected exceptions.

### 7.2 Environment Variables

Server `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
GEMINI_API_KEY=
GEMINI_MODEL=
CLIENT_ORIGIN=http://localhost:5173
```

Client `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Never prefix server secrets with `VITE_`.

The Gemini API key and MongoDB connection string must remain server-side. Do not commit real secrets to source control.

---

## 8. REST API Specification

All API responses use JSON.

### 8.1 Common Response Format

Successful response:

```json
{
  "success": true,
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The supplied request is invalid."
  }
}
```

The `data` property contains endpoint-specific information.

### 8.2 Create a Mystery

**Endpoint:** `POST /api/cases`

**Request:**

```json
{
  "premise": "A priceless diamond disappears from a locked museum.",
  "difficulty": "medium"
}
```

**Success:** `201 Created`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "CASE_ID",
    "title": "The Vanishing Diamond",
    "difficulty": "medium",
    "story": "A diamond disappeared during a private exhibition.",
    "crimeScene": "The display room was locked...",
    "suspects": [],
    "clues": [
      {
        "id": "clue_1",
        "title": "A Broken Seal",
        "discovered": false
      }
    ],
    "progress": {
      "discoveredClues": 0,
      "totalClues": 7,
      "hintsUsed": 0,
      "status": "active"
    }
  }
}
```

The response must not contain the culprit, solution explanation, or undiscovered clue descriptions.

### 8.3 Retrieve an Active Case

**Endpoint:** `GET /api/cases/:id`

**Success:** `200 OK`

Return the public story, suspects, clue discovery states, investigation progress, and available actions.

Undiscovered clue descriptions must remain server-side.

For completed cases, return a completed-state response that directs the frontend to the results view without exposing the solution through the active-case representation.

### 8.4 Discover a Clue

**Endpoint:** `POST /api/cases/:id/clues/:clueId/discover`

**Request:** No body required.

**Success:** `200 OK`

**Response:**

```json
{
  "success": true,
  "data": {
    "clue": {
      "id": "clue_1",
      "title": "A Broken Seal",
      "description": "The security seal was tampered with.",
      "discovered": true
    },
    "progress": {
      "discoveredClues": 1,
      "totalClues": 7
    }
  }
}
```

Rules:

- The case must exist and remain active.
- The clue must belong to the case.
- The clue description is revealed only through this operation.
- Discovering an already discovered clue must not award points again.
- Discovery must be persisted.

### 8.5 Request a Hint

**Endpoint:** `POST /api/cases/:id/hints`

**Request:** No body required.

**Success:** `200 OK`

**Response:**

```json
{
  "success": true,
  "data": {
    "hint": {
      "index": 1,
      "text": "Compare the timeline with the access records."
    },
    "progress": {
      "hintsUsed": 1,
      "hintsRemaining": 2
    }
  }
}
```

Rules:

- Reveal the next hint in sequence.
- Each hint can be claimed only once.
- Do not return future hints.
- Reject requests after all hints have been used.
- Reject requests for completed cases.
- Persist hint usage before confirming success.

### 8.6 Submit an Accusation

**Endpoint:** `POST /api/cases/:id/accuse`

**Request:**

```json
{
  "suspectId": "suspect_1"
}
```

**Success:** `200 OK`

**Response:**

```json
{
  "success": true,
  "data": {
    "status": "completed",
    "verdict": "correct",
    "score": 155,
    "scoreBreakdown": {
      "basePoints": 150,
      "cluePoints": 35,
      "hintPenalty": 30
    }
  }
}
```

The example assumes a correct medium-difficulty accusation, seven discovered clues, and three hints used.

The immediate response must not disclose the culprit identifier or solution explanation. The frontend can navigate to the results page after receiving confirmation.

Rules:

- Validate the suspect identifier.
- Verify the suspect belongs to the case.
- Calculate the verdict and score on the backend.
- Persist the accusation and completion state.
- Prevent subsequent accusations.
- Ensure retries cannot award points more than once.

### 8.7 Retrieve Results

**Endpoint:** `GET /api/cases/:id/result`

**Success:** `200 OK`

Only completed cases may return the solution.

**Response:**

```json
{
  "success": true,
  "data": {
    "status": "completed",
    "verdict": "correct",
    "accusedSuspectId": "suspect_1",
    "culprit": {
      "id": "suspect_1",
      "name": "Mira Chen"
    },
    "explanation": "The access records contradict the suspect's alibi.",
    "reasoning": [
      "The access log contradicts the stated alibi.",
      "The tampered seal supports the established timeline."
    ],
    "score": 155,
    "scoreBreakdown": {
      "basePoints": 150,
      "cluePoints": 35,
      "hintPenalty": 30
    }
  }
}
```

Return `403 Forbidden` or an equivalent controlled error if the case is active. The frontend must never receive solution fields before completion.

### 8.8 API Error Codes

| HTTP Status | Error Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Invalid request data |
| 400 | `INVALID_DIFFICULTY` | Unsupported difficulty |
| 404 | `CASE_NOT_FOUND` | Case does not exist |
| 404 | `CLUE_NOT_FOUND` | Clue does not belong to the case |
| 404 | `SUSPECT_NOT_FOUND` | Suspect does not belong to the case |
| 409 | `CASE_COMPLETED` | Operation not allowed after completion |
| 409 | `HINTS_EXHAUSTED` | No hints remain |
| 409 | `INVALID_CASE_STATE` | Operation conflicts with case state |
| 429 | `RATE_LIMITED` | Request limit exceeded |
| 502 | `AI_GENERATION_FAILED` | AI generation failed |
| 503 | `SERVICE_UNAVAILABLE` | Required service unavailable |
| 500 | `INTERNAL_ERROR` | Unexpected server failure |

Never return API keys, stack traces, raw database errors, or internal solution data in error responses.

---

## 9. Database Design

### 9.1 Case Model

Use a Mongoose `Case` model.

```javascript
{
  premise: String,
  title: String,
  story: String,
  crimeScene: String,

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },

  suspects: [
    {
      id: String,
      name: String,
      role: String,
      background: String,
      publicAlibi: String
    }
  ],

  clues: [
    {
      id: String,
      title: String,
      description: String,
      category: String,
      discovered: Boolean,
      discoveredAt: Date
    }
  ],

  hints: [String],

  solution: {
    culpritId: String,
    explanation: String,
    reasoning: [String]
  },

  playerProgress: {
    discoveredClueIds: [String],
    usedHintCount: Number
  },

  accusation: {
    suspectId: String,
    isCorrect: Boolean,
    submittedAt: Date
  },

  score: {
    basePoints: Number,
    cluePoints: Number,
    hintPenalty: Number,
    total: Number
  },

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },

  createdAt: Date,
  updatedAt: Date,
  completedAt: Date
}
```

This is a conceptual schema. The implementation must define appropriate Mongoose types, defaults, required fields, length limits, and validation rules.

### 9.2 Database Rules

- Use MongoDB-generated document identifiers.
- Require a valid difficulty value.
- Validate the relationship between the culprit identifier and suspects.
- Require unique clue and suspect identifiers within a case.
- Store only server-generated score values.
- Track clue discovery by identifier.
- Track hints as a count or equivalent validated state.
- Record the accusation and completion timestamp.
- Use timestamps for case creation and updates.
- Apply a configurable retention policy if temporary cases should expire.

### 9.3 Solution Isolation

The solution must be excluded from all active-case responses.

Additional requirements:

1. Never send the full Mongoose document directly to the frontend.
2. Use explicit response serializers or DTOs.
3. Never include culprit fields in client-side state, hidden HTML, or JavaScript bundles.
4. Do not expose undiscovered clue descriptions.
5. Do not log the complete solution in production request logs.
6. Only expose the solution through the results endpoint after completion.

Because the first release does not require accounts, a case ID should not be treated as strong authentication. For a public deployment, consider adding an unguessable player capability token or authenticated sessions, ownership checks, and abuse controls to prevent unauthorized case access and result retrieval.

---

## 10. Scoring System

### 10.1 Scoring Formula

Let:

- `B` = base points for the selected difficulty.
- `C` = number of unique clues discovered.
- `H` = number of hints used.
- `R` = 1 for a correct accusation, otherwise 0.

Then:

**Final Score = max(0, (R × B) + (C × 5) − (H × 10))**

### 10.2 Base Points

| Difficulty | Correct Accusation | Incorrect Accusation |
|---|---:|---:|
| Easy | 100 | 0 |
| Medium | 150 | 0 |
| Hard | 200 | 0 |

An incorrect accusation receives no base points but retains eligible clue points after hint penalties.

### 10.3 Example Calculations

**Example A: Easy**

- Correct accusation: 100
- Four clues discovered: +20
- One hint used: −10

Final score: **110 points**

**Example B: Medium**

- Correct accusation: 150
- Seven clues discovered: +35
- Three hints used: −30

Final score: **155 points**

**Example C: Hard**

- Incorrect accusation: 0
- Six clues discovered: +30
- Two hints used: −20

Final score: **10 points**

### 10.4 Scoring Requirements

- Scoring runs exclusively on the backend.
- Never accept score values from the client.
- Count each clue at most once.
- Count each hint at most once.
- Prevent duplicate accusation processing.
- Enforce a minimum score of zero.
- Save the score breakdown with the completed case.
- Return the same saved result on repeated result requests.

### 10.5 Atomic State Changes

Operations that change case progress must not produce duplicate rewards under concurrent requests.

Use atomic updates, appropriate transactions, or conditional state transitions as necessary.

Accusation processing must ensure that only one request can transition a case from `active` to `completed`.

---

## 11. Security Requirements

### 11.1 Secret Management

- Store Gemini credentials in server environment variables.
- Store MongoDB credentials on the server.
- Never expose secrets through frontend environment variables.
- Exclude `.env` files from Git.
- Use separate credentials for development and production.

### 11.2 Input Validation

- Validate all request bodies and route parameters.
- Enforce premise length limits.
- Restrict difficulty to the allowed enum.
- Validate suspect and clue ownership.
- Reject unexpected fields where appropriate.
- Sanitize user-generated content before rendering.
- Avoid rendering AI-generated HTML directly.

### 11.3 API Protection

- Apply rate limits to case generation and state-changing endpoints.
- Configure CORS for approved origins.
- Use HTTPS in production.
- Apply appropriate request-size limits.
- Avoid leaking database and AI-provider details.
- Configure production error handling.

### 11.4 AI Safety and Reliability

- Treat user premises as untrusted input.
- Instruct the model not to follow instructions embedded in the premise that conflict with the generation contract.
- Require structured output.
- Validate all generated data.
- Limit retries and generation timeouts.
- Handle provider rate limits and unavailable services.
- Never trust the model to calculate final scores.
- Never use the frontend's reported state as the source of truth.

### 11.5 Access Control Limitations

The initial application may operate without accounts. This is acceptable for a demonstration, but it does not provide strong player ownership.

For a publicly accessible release, protect case operations against unauthorized modification and enumeration. If player sessions or capability tokens are introduced, enforce ownership on every applicable endpoint.

---

## 12. Frontend State Management

The frontend should maintain only the state needed for presentation and interaction.

Example investigation state:

```javascript
{
  caseId: null,
  title: "",
  difficulty: "easy",
  story: "",
  crimeScene: "",
  suspects: [],
  clues: [],
  discoveredClueIds: [],
  hintsUsed: 0,
  totalHints: 2,
  status: "active"
}
```

This state must not contain the hidden solution.

### 12.1 State Synchronization

- Fetch the active case from the backend on page load.
- Persist every clue discovery and hint request through the API.
- Update the UI only after the server confirms success.
- Handle refreshes without losing persisted progress.
- Redirect completed cases to their results page.
- Display loading and error states during API operations.

The server remains authoritative even if browser state is manipulated.

---

## 13. Loading, Error Handling, and Observability

### 13.1 Mystery Generation

Display a clear loading state while the AI generates the case.

The UI may communicate progress using messages such as:

- Preparing the crime scene.
- Introducing the suspects.
- Examining the evidence.

These are presentation messages, not claims about the provider's internal progress.

Disable repeated submissions while generation is in progress.

If generation fails, preserve the premise and difficulty so the user can retry.

### 13.2 Investigation Errors

If clue discovery or hint retrieval fails:

- Preserve the existing investigation state.
- Display a concise error.
- Allow the player to retry.
- Avoid marking an action successful before backend confirmation.

### 13.3 Logging

Log:

- Request identifiers.
- Endpoint and status.
- Generation duration.
- Validation failures.
- Unexpected errors.
- Case identifiers where appropriate.

Do not log API secrets, capability tokens, or complete hidden solutions.

---

## 14. Testing Strategy

### 14.1 Unit Tests

Test:

- Difficulty configuration.
- Premise validation.
- Gemini response validation.
- Unique identifier validation.
- Scoring calculations.
- Clue deduplication.
- Hint limits.
- Case state transitions.

### 14.2 API Integration Tests

Verify:

- Valid case creation.
- Invalid premise rejection.
- Unsupported difficulty rejection.
- Retrieval of an active case.
- Successful clue discovery.
- Duplicate clue discovery.
- Hint exhaustion.
- Invalid suspect accusation.
- Correct accusation.
- Incorrect accusation.
- Repeated accusation.
- Results access before completion.
- Results access after completion.

Use a mocked Gemini provider for deterministic tests. Keep a separate optional integration test for the real Gemini API.

### 14.3 Frontend Tests

Verify:

- Navigation between pages.
- Form validation.
- Difficulty selection.
- Loading and error states.
- Clue discovery updates.
- Hint counters.
- Accusation submission.
- Results rendering.
- Responsive layout and keyboard accessibility.

### 14.4 End-to-End Test

The following complete journey must work:

1. Open the deployed home page.
2. Start a mystery.
3. Enter a premise.
4. Select a difficulty.
5. Generate a case.
6. Examine suspects.
7. Discover a clue.
8. Request a hint.
9. Accuse a suspect.
10. View the verdict and explanation.
11. Verify the final score.
12. Start another mystery.

Repeat the journey across all three difficulty levels.

---

## 15. Deployment Plan

### 15.1 Frontend

Deploy the React/Vite application to Vercel or an equivalent static hosting platform.

Configure:

- Production build command.
- Correct output directory.
- API base URL.
- SPA fallback routing so direct navigation to nested routes works.

### 15.2 Backend

Deploy the Express server to Render or an equivalent Node.js hosting platform.

Configure:

- Production start command.
- MongoDB connection string.
- Gemini API key.
- Gemini model configuration.
- Approved frontend origin.
- Health-check endpoint.
- Production logging.

### 15.3 Database

Use MongoDB Atlas or an equivalent managed MongoDB deployment.

Configure:

- Database user with least-privilege access.
- Network access restrictions where practical.
- Production credentials.
- Backup and retention policies appropriate to the deployment.

### 15.4 Production Verification

After deployment:

- Confirm frontend and API availability.
- Verify database connectivity.
- Generate at least one mystery per difficulty.
- Complete an investigation.
- Verify clue and hint persistence.
- Verify correct and incorrect scoring.
- Verify the solution remains hidden until accusation.
- Test direct navigation to nested routes.
- Confirm the browser console has no critical errors.

### 15.5 Health Check

Implement:

`GET /api/health`

Example response:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

The endpoint should indicate service health without revealing credentials or infrastructure details.

---

## 16. Project Limitations

The first release has the following limitations:

1. Mysteries depend on the availability and quality of the Gemini API.
2. AI-generated content may occasionally require regeneration.
3. Logical consistency cannot be guaranteed by schema validation alone.
4. The application does not require player accounts.
5. Cross-device player identity and persistent profiles are not included.
6. Multiplayer features are excluded.
7. A live deployment may incur hosting, database, and AI API costs.
8. Rate limits and provider quotas may affect generation.
9. Case ownership and abuse prevention require additional controls for a production-scale service.
10. The initial application focuses on a single completed mystery per investigation session.

These limitations must be reflected in the README and deployment documentation where relevant.

---

## 17. Acceptance Criteria

The project is complete only when the following conditions are met.

### Functional

- [ ] Users can create mysteries using a custom premise.
- [ ] Easy mysteries contain exactly 3 suspects, 5 clues, and 2 hints.
- [ ] Medium mysteries contain exactly 4 suspects, 7 clues, and 3 hints.
- [ ] Hard mysteries contain exactly 5 suspects, 9 clues, and 3 hints.
- [ ] Generated cases contain a valid, identifiable culprit.
- [ ] Players can examine suspects and discover clues.
- [ ] Players can request hints within the configured limit.
- [ ] Players can accuse a suspect.
- [ ] The results page reveals the correct solution and explanation.
- [ ] Players can start another mystery.

### Security

- [ ] The Gemini API key is never exposed to the frontend.
- [ ] The solution is never included in active-case API responses.
- [ ] Undiscovered clue descriptions are not sent to the frontend.
- [ ] Invalid suspect and clue identifiers are rejected.
- [ ] Completed cases reject new accusations.
- [ ] Score calculations use server-side state.
- [ ] Duplicate requests cannot award duplicate points.

### Scoring

- [ ] Correct base scores are 100, 150, and 200.
- [ ] Each unique discovered clue contributes 5 points.
- [ ] Each hint used incurs a 10-point penalty.
- [ ] Incorrect accusations receive no base points.
- [ ] Final scores cannot fall below zero.
- [ ] The displayed breakdown matches the persisted score.

### Quality

- [ ] Forms have clear validation.
- [ ] Loading and error states work.
- [ ] Investigation progress persists across page refreshes.
- [ ] The UI works on desktop and mobile.
- [ ] Automated tests cover scoring and critical API rules.
- [ ] Production environment variables are configured correctly.
- [ ] The deployed website completes a full investigation successfully.

---

## 18. Final Deliverables

The project must include:

1. `SPEC.md` — Complete project specification.
2. Frontend source code.
3. Backend source code.
4. MongoDB/Mongoose schema.
5. Gemini integration and output validation.
6. REST API implementation.
7. Automated tests for critical functionality.
8. `.env.example` files without real credentials.
9. `README.md` with setup and deployment instructions.
10. Publicly deployed frontend URL.
11. Deployed API URL or documented API base URL.
12. Demonstration of a complete mystery-solving session.

---

## 19. Implementation Order

Build the project in the following sequence:

**Phase 1 — Specification**
- Finalize this specification.
- Confirm API contracts, data structures, and scoring rules.

**Phase 2 — Foundation**
- Initialize React, Vite, Tailwind CSS, Node.js, and Express.
- Configure MongoDB and Mongoose.
- Establish environment variables and API connectivity.

**Phase 3 — Backend**
- Implement the case model.
- Integrate Gemini.
- Validate generated mysteries.
- Implement clue discovery, hints, accusations, and results.
- Add server-side scoring and security controls.

**Phase 4 — Frontend**
- Implement the five pages.
- Build reusable suspect, clue, hint, and progress components.
- Connect the API.
- Add responsive styling and interaction states.

**Phase 5 — Testing**
- Test business rules and API security.
- Validate all difficulty levels.
- Run the complete investigation journey.

**Phase 6 — Deployment**
- Deploy the frontend and backend.
- Configure MongoDB Atlas and Gemini credentials.
- Verify the production website.
- Document the live URLs.

### Definition of Done

The project is finished when a user can open the deployed website, generate a mystery at any supported difficulty, investigate suspects, discover clues, request hints, submit an accusation, and receive the correct verdict and backend-calculated score without the solution being exposed prematurely.

**End of Specification**