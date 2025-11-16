# 📝 Daily Task Manager (Supabase + Vanilla JS)

A simple and clean task management application built with JavaScript, Supabase, SweetAlert2, and CSS loaders.  
This project allows users to create, edit, delete, and categorize tasks based on importance.

---

## 🚀 Features

- ➕ Add new tasks
- ✏️ Edit existing tasks (SweetAlert2 input popup)
- 🗑️ Delete tasks with confirmation modal
- ⭐ Task importance levels (low, medium, high)
- 📦 Data stored in Supabase Database
- 🔄 Real-time UI update after CRUD operations
- 🎡 Loading animation while fetching tasks
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend

- HTML
- CSS
- JavaScript (Vanilla)

### Backend

- Supabase RESTful API (CRUD)

### UI / Alerts

- SweetAlert2

---

## 📡 API Endpoints (Supabase REST)

| Action        | Method | Endpoint              |
| ------------- | ------ | --------------------- |
| Get all tasks | GET    | /tasks?select=\*      |
| Add new task  | POST   | /tasks                |
| Update task   | PATCH  | /tasks?id=eq.{taskID} |
| Delete task   | DELETE | /tasks?id=eq.{taskID} |

All requests include:

- apikey
- Authorization: Bearer {anon key}
- Content-Type: application/json

---

## 📌 How It Works

1. App fetches tasks from Supabase on page load
2. Shows a loading spinner until data is ready
3. Renders task list ordered by created_at
4. Each task has:
   - Edit button
   - Delete button
   - Color based on importance

---

## 🔮 Future Improvements

- User authentication
- Dark mode
- Drag & drop for sorting
- Search & filter tasks

---

👩🏻‍💻 Developed by [Paria Rajaby](https://github.com/paria-rajaby)
