# 📊 Student Progress Management System – TLE Eliminators Assignment

A full-stack **MERN** web application that allows educators and mentors to track and analyze the **Codeforces** performance of students. It automates data syncing, visualizes contest and problem-solving history, and sends inactivity reminders to keep students engaged.

## 🌐 Live Demo

> ❌ Not deployed  
> ✅ Local run demonstration video: [📹 Demo Video](#)  
> 🔗 GitHub Repository: [Eliminators](https://github.com/urpitvrm/Eliminators)

---

## 📁 Project Structure

### 📦 Backend
- `controllers/` – Handles logic for students, cron jobs, and inactivity
- `cron/` – Codeforces sync scheduling and job state
- `jobs/` – Email reminder job for inactive students
- `models/` – Mongoose schemas (Student, CodeforcesData, CronTime)
- `routes/` – Express API routes
- `utils/` – Mail service using Nodemailer

### 🖼 Frontend
- `components/` – UI elements: Table, CSV Export, Update Cron
- `pages/` – Main screens: Home, Register, Profile, Update

---

## 🚀 Features

### 🧾 Student Table
- View students with:
  - Name, Email, Phone, Codeforces Handle, Current & Max Rating
- Add, Edit, Delete student data
- View full profile with detailed stats
- Export entire dataset as CSV:
  - Fields: Name, Email, Phone, Handle, Current Rating, Max Rating

### 👤 Profile View
- **Contest Stats**:
  - Rating over time (30/90/365 days)
  - Rank changes, rating jumps, contest details
- **Problem Solving**:
  - Total solved, avg rating, problems/day
  - Most difficult solved problem
  - Bar chart of problem count by difficulty
  - Submission heatmap

### 🔄 Codeforces Sync
- Daily sync at 2 AM by default
- Update cron time via UI
- Manual sync on Codeforces handle update

### ✉️ Inactivity Detection
- Detect students with **no submissions in last 7 days**
- Send auto email reminders via Nodemailer
- Count reminders sent (viewable)
- Option to disable reminders for individual students

### 📱 Responsive Design
- Responsive table and card layouts for mobile/tablet

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
# Add your .env file with the below format
npm run dev

Frontend
cd frontend
npm install
npm run dev

.env Example for Backend

PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

Method	Endpoint	Description
GET	/api/students	Get all students
POST	/api/students	Add new student
PUT	/api/students/:id	Edit student info
DELETE	/api/students/:id	Delete a student
POST	/api/cron/update-cron	Update cron sync time
GET	/api/codeforces/:handle	Fetch Codeforces profile instantly
POST	/api/inactivity/reminders	Trigger reminder job (internal use)
PUT	/api/students/:id/toggle-reminder	Enable/Disable email reminders
