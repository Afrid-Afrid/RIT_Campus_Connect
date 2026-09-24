# STLC Documentation — CampusConnect

## 1. Requirement Analysis
Application: CampusConnect — student/faculty/admin web portal (MERN stack).
Modules: Auth, Dashboard, Courses, Attendance, Events, Profile, Admin.

## 2. Test Planning
- Scope: Manual functional testing + Selenium UI automation + Postman API testing.
- Entry criteria: Backend and frontend running locally, seed data loaded.
- Exit criteria: All critical-path test cases pass, no open High-severity bugs.

## 3. Test Case Design
See `test_cases.md`.

## 4. Test Environment Setup
- Node.js, MongoDB (local or Atlas), Python + PyCharm, Postman.
- `.env` configured per `server/.env.example`.

## 5. Test Execution
- Manual: run through test_cases.md against the running app.
- Automated UI: `pytest automation/tests/`.
- API: import postman/CampusConnect.postman_collection.json + local.postman_environment.json, run via Collection Runner.

## 6. Test Closure
Summarize pass/fail counts, defect log (`bug_reports.md`), and lessons learned once execution is complete.
