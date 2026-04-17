# ⚡ Smart Consulting Task-Analyst [M4TR1X]

An AI-driven requirements engineering tool designed to transform unstructured project descriptions into actionable command sets. Built as a technical showcase for **AI-Enablement** and **Full-Stack Engineering**.

![CI Status](https://github.com/junesdream/smart-consulting-task-analyst/actions/workflows/main.yml/badge.svg)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/Framework-FastAPI-green)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🤖 **AI-Logic Simulation** | Automatically extracts tasks and detects priority levels (High/Standard) from raw text input |
| 🗄️ **Persistence** | Full CRUD-capable backend using **FastAPI** and **SQLAlchemy** with a **SQLite** database |
| 🖥️ **Modern UI** | High-performance Matrix-themed frontend built with **React**, **Vite**, and **Tailwind CSS** |
| 🐳 **Containerization** | Production-ready deployment via **Docker** |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.11, FastAPI, SQLAlchemy, Uvicorn |
| **Frontend** | React 18 (TypeScript), Tailwind CSS, Lucide Icons, Axios |
| **DevOps** | Docker, Docker Compose |

---

## 📂 Project Structure

```
/                        → Python FastAPI Backend & Docker configuration
/task-analyst-ui         → React Frontend (Vite project)
consulting_tasks.db      → SQLite Database (auto-generated)
```

---

## 📦 Installation & Setup

### 1. Backend (Manual Setup)
```bash
# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd task-analyst-ui
npm install
npm run dev
```

### 3. Docker Deployment (Recommended)
```bash
# Build the container
docker build -t smart-task-backend .

# Run the container
docker run -p 8000:8000 smart-task-backend
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Commit your changes (`git commit -m 'feat: add your idea'`)
4. Push to the branch (`git push origin feature/your-idea`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

JuNe aka RainbowDev — System Architect • Full-Stack Development • Electronic Music