# 📊 Student Progress Management System – TLE Eliminators Assignment

A full-stack MERN-based web application that allows educators and mentors to track and analyze the Codeforces performance of students. It automates Codeforces data sync, visualizes contest and problem-solving history, and sends inactivity alerts to keep students engaged.

## 🌐 Live Demo

> Not deployed. Local run demonstration video available: [📹 Demo Video](#)  
> GitHub Repository: [🔗 Link to Repo](https://github.com/urpitvrm/Eliminators)

---

## 📁 Project Structure

### 📦 Backend
- `controllers/` – Business logic for students, cron, and inactivity
- `cron/` – Cron state and Codeforces data sync
- `jobs/` – Auto reminder email job
- `models/` – Mongoose schemas: students, cron time, Codeforces data
- `routes/` – Express API endpoints
- `utils/` – Nodemailer-based mail service

### 🖼 Frontend
- `components/` – Reusable layout and button components
- `pages/` – Screens: Home, Register, Table, Profile, Update
- `assets/` – CSS and theme
- Mobile responsive + dark/light mode support

---

## 🚀 Features

### 🧾 Student Table View
- List all enrolled students with:
  - Name, Email, Phone, Codeforces Handle, Current/Max Rating
- Add, Edit, Delete entries
- View full profile (contest + problem data)
- Download all student data as CSV
- Display last CF data update time per student

### 👤 Student Profile View
- **Contest History** (30/90/365 days):
  - Rating graph
  - Rank, rating changes, unsolved problems
- **Problem Solving Data** (7/30/90 days):
  - Most difficult problem solved
  - Total solved, average rating & problems/day
  - Bar chart (problems by rating bucket)
  - Submission heatmap

### 🔄 Codeforces Sync
- Daily auto-sync (default: 2 AM)
- Update cron time/frequency via UI
- Re-fetch data immediately when CF handle is edited

### ✉️ Inactivity Detection
- Identify students with no submissions in the last 7 days
- Auto-email reminders using Nodemailer
- Track how many times reminder sent
- Option to disable auto-emails per student

### 🎨 Bonus Features
- Responsive on mobile/tablet
- Light & Dark mode toggle
- Clean and well-documented code

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Scheduler:** node-cron
- **Email:** Nodemailer
- **Charts:** Chart.js, React Calendar Heatmap

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
# Configure .env with Mongo URI and email credentials
npm start


--cd frontend
npm install
npm run dev
--Backend .env Example
PORT=5000
MONGO_URI=your_mongo_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

Key API Endpoints
Method	Endpoint	Description
GET	/api/students	Get all students
POST	/api/students	Add new student
PUT	/api/students/:id	Edit student
DELETE	/api/students/:id	Delete student
POST	/api/cron/update-cron	Update cron time
GET	/api/codeforces/:handle	Fetch Codeforces profile instantly
