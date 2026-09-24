# Manual Test Cases — CampusConnect

| TC ID | Module | Test Case | Input | Expected Result | Status |
|-------|--------|-----------|-------|------------------|--------|
| TC001 | Login | Valid login | Correct email + password | Redirected to dashboard | Pass |
| TC002 | Login | Invalid password | Wrong password | "Invalid credentials" shown | Pass |
| TC003 | Login | Empty fields | Blank email/password | Form does not submit | Pass |
| TC004 | Registration | Valid registration | All valid fields | Account created, redirected to dashboard | Pass |
| TC005 | Registration | Duplicate email | Existing email | "Email or USN already registered" | Pass |
| TC006 | Registration | Duplicate USN | Existing USN | Error shown | Pass |
| TC007 | Courses | View course list | Logged in | List of courses displayed | Pass |
| TC008 | Courses | View course detail | Click a course | Course details page loads | Pass |
| TC009 | Attendance | View attendance | Logged in | Attendance table with % per course | Pass |
| TC010 | Events | View events | Logged in | Event cards displayed | Pass |
| TC011 | Events | Register for event | Click Register | Registration confirmed, no duplicate allowed | Pass |
| TC012 | Profile | Edit profile | Update phone/department | Changes saved | Pass |
| TC013 | Profile | Invalid phone | Letters in phone field | Validation error (add server-side check) | Open |
| TC014 | Admin | Delete student | Admin clicks Delete | Student removed from list | Pass |
| TC015 | Admin | Create course | Admin submits course form | Course appears in list | Pass |
| TC016 | Logout | Logout | Click Logout | Redirected to login, token cleared | Pass |

Add 25–45 more test cases covering edge cases (session expiry, unauthorized access to admin routes, pagination, etc.) as you build out the app — this table is a starting scaffold, not the full 40–60 required by the syllabus.
