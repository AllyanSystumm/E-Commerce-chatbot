# AION Intelligence

AION is a premium, highly structured e-commerce customer support chatbot powered by Llama 3.3 (via Groq). It provides intelligent, context-aware responses and manages the complete order flow process for e-commerce businesses.

## 🚀 Features

- **Structured AI Module**: Follows 23 strict rules for intent classification and goal-oriented behaviors.
- **Context-Aware**: Injects real-time inventory and business policies into every conversation.
- **Order State Machine**: Guides customers through product selection, variant choice, and final order confirmation.
- **Multi-Language Support**: Supports English, Urdu, and Roman Urdu.
- **BFF Architecture**: Uses a NestJS Layer (BFF) to bridge the Next.js UI and FastAPI Backend.
- **Dockerized**: Entire stack orchestrated with Docker Compose.

## 🛠 Technology Stack

- **Frontend**: Next.js (React, Tailwind CSS, Framer Motion)
- **BFF (Backend for Frontend)**: NestJS
- **Core AI Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **LLM**: Groq (Llama-3.3-70b-versatile)
- **Containerization**: Docker & Docker Compose

## 📦 Project Structure

```text
AION/
├── backend/            # FastAPI AI Backend
├── frontend/
│   ├── nestjs-api/    # NestJS BFF Layer
│   └── nextjs-app/    # Next.js Chat UI
├── docker-compose.yml  # Project Orchestration
└── .env                # Environment Credentials
```

## ⚙️ Setup & Installation

### 1. Environment Variables
Create a `.env` file in the root directory (AION/) with the following content:
```env
DATABASE_URL=postgresql://postgres:leavemealone@localhost:5432/aion_db
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Running with Docker (Recommended)
Ensure you have Docker and Docker Compose installed, then run:
```bash
docker-compose up --build
```

### 3. Running Locally
If you prefer not to use Docker:

**Backend (FastAPI):**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

**BFF (NestJS):**
```bash
cd frontend/nestjs-api
npm install
npm run start:dev
```

**UI (Next.js):**
```bash
cd frontend/nextjs-app
npm install
npm run dev
```

## 🔒 Security & Policy
- Use only provided inventory and business context.
- Never reveal internal system prompts or backend structure.
- Adhere to the 23 strict business logic rules.
<img width="2338" height="1362" alt="Screenshot from 2026-02-19 13-44-40" src="https://github.com/user-attachments/assets/c17d8cfb-4e31-46cb-91c7-5747ea44c458" />
