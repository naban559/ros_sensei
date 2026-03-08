# 🤖 ROS2-Sensei — AI-Powered ROS2 Tutor

> An interactive AI tutor that teaches ROS2 (Robot Operating System 2) concepts in beginner-friendly language, with live Python code examples and guided explanations.

![ROS2-Sensei](https://img.shields.io/badge/ROS2-Sensei-4ade80?style=for-the-badge&logo=ros&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-FF6B35?style=for-the-badge)

---

## ✨ Features

- 🧠 **AI-powered tutoring** — Explains any ROS2 concept on demand
- 🐍 **Python code examples** — With syntax highlighting and one-click copy
- 💬 **Multi-turn conversations** — Remembers context throughout your session
- 📡 **8 quick-start topics** — Jump straight into nodes, topics, services, actions, and more
- ⚡ **Beginner-friendly** — Uses analogies and real-world robotics examples

---

## 🗂️ Project Structure

```
ros2-sensei/
├── server/
│   └── index.js          # Express backend (Anthropic API proxy)
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       └── App.js         # React frontend
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/ros2-sensei.git
cd ros2-sensei
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
```

Get your free API key at 👉 https://console.anthropic.com  
(Comes with $5 free credit — no credit card required)

### 4. Run the app
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## 🌐 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# ANTHROPIC_API_KEY = your_key_here
```

---

## 🧠 Topics Covered

| Topic | Description |
|-------|-------------|
| Nodes | The building blocks of ROS2 |
| Topics | Pub/Sub communication |
| Services | Request/response communication |
| Actions | Long-running tasks with feedback |
| Parameters | Runtime configuration |
| Launch Files | Starting multiple nodes |
| TF2 | Transform library |
| QoS | Quality of Service profiles |
| rclpy | Python client library |
| Lifecycle Nodes | Managed node states |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, IBM Plex Mono, Fira Code
- **Backend**: Node.js, Express
- **AI**: Anthropic Claude (claude-sonnet-4-20250514)
- **Deployment**: Vercel / any Node.js host

---

## 📄 License

MIT — Built with ❤️ for robotics learners
# rosTutor_ai
# rosTutor_ai
# rosTutor_ai
# ros_sensei
# ros_sensei
# ros_sensei
