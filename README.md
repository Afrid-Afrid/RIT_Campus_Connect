# CampusConnect

Full-stack MERN campus management portal built as a testing playground for
Manual Testing, Selenium WebDriver (Python), and Postman API testing.

## Structure
- `server/` — Node.js + Express + MongoDB API
- `client/` — React (Vite) frontend
- `automation/` — Selenium + pytest, Page Object Model
- `postman/` — API collection + environment
- `docs/` — STLC docs, manual test cases, bug reports

## Setup

### 1. Backend
\`\`\`bash
cd server
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev             # starts on http://localhost:5000
\`\`\`

### 2. Frontend
\`\`\`bash
cd client
npm install
npm run dev              # starts on http://localhost:3000
\`\`\`

### 3. Selenium automation
\`\`\`bash
cd automation
python -m venv venv
source venv/bin/activate    # or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
pytest tests/ -v
\`\`\`
Make sure both backend and frontend are running first, and that at least
one test user exists matching `utils/config.py::TEST_STUDENT` (register
one manually or add a seed script).

### 4. Postman
Import `postman/CampusConnect.postman_collection.json` and
`postman/local.postman_environment.json` into Postman, select the
"CampusConnect Local" environment, run **Login** first (it stores the JWT
into `{{token}}` automatically), then run the rest of the collection.

## How data flows
- **Students** register/login, then go to Courses and self-enroll in whichever
  courses they're taking (`enrolledCourses` on their user record).
- **Admins** manage the course catalog and events (Admin panel → Courses / Events
  tabs), and mark attendance per course (Admin panel → Attendance tab — pick a
  course, pick a date, mark each enrolled student Present/Absent).
- Students only ever see attendance and events; they never create either.

## Deploying (free tier)
- `client/.env.example` — copy to `.env` and set `VITE_API_URL` to your deployed
  backend's `/api` URL (e.g. `https://campusconnect-api.onrender.com/api`) when
  hosting on Vercel/Netlify. Leave it blank for local dev — the Vite proxy
  handles `/api` calls to `localhost:5000` automatically.
- `server/.env.example` — same idea for the backend: `MONGO_URI` becomes your
  MongoDB Atlas connection string, `JWT_SECRET` stays a long random string,
  set both as environment variables in Render's dashboard (never commit `.env`).

## Notes
- Never commit `.env` — it holds your Mongo URI and JWT secret.
- The `phone` field currently has no format validation — thats intentional,
  its BUG001 in docs/bug_reports.md for you to fix and re-test.
- This is a lean scaffold: CRUD, auth, and the core modules work end-to-end,
  but you should expand test_cases.md to the full 40 to 60 cases your syllabus asks for.
