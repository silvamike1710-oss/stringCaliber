
https://string-caliber-xb7v.vercel.app/

String Caliber

A full-stack guitar string tension calculator built with React, TypeScript, FastAPI, and Python.

Users can calculate guitar string tension based on:

string gauge
scale length
tuning frequency
6-string or 7-string guitar setups

The application uses a FastAPI backend for tension calculations and a React frontend deployed separately.

Features
String tension calculation
6-string and 7-string guitar support
Real musical note frequencies
Gauge-based calculations
FastAPI REST API
React + TypeScript frontend
Responsive UI with TailwindCSS
Deployed with Vercel + Render
Tech Stack
Frontend
React
TypeScript
Vite
TailwindCSS
Axios
Backend
Python
FastAPI
Pydantic
Uvicorn
Deployment
Vercel (frontend)
Render (backend)
Project Structure
stringCaliber/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── calculations.py
│   │
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.ts
Formula Used

The calculator uses the standard string tension formula:

T=
386.4
UW×(2×L×F)
2
	​
Vercel Deploy:
https://string-caliber-xb7v.vercel.app/

Uma aplicação capaz de:
- calcular tensão das cordas
- converter notas musicais em frequencia
- armazenar calibres em banco de dados
- gerar presets de afinação
- expor tudo via API REST



Where:

T = tension (lbs)
UW = unit weight
L = scale length
F = frequency
Local Development
Backend

Navigate to backend:

cd backend

Install dependencies:

pip install -r requirements.txt

Run FastAPI:

uvicorn app.main:app --reload

API docs:

http://127.0.0.1:8000/docs
Frontend

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Run development server:

npm run dev
Environment Variables
Frontend .env
VITE_API_URL=https://your-render-api.onrender.com

Future Improvements
Bass guitar support
Custom tunings
Total neck tension calculation
String set presets
Saved user presets
Graph visualization
String brand database

Author:
Michael Silva

GitHub:
[GitHub Profile](https://github.com/silvamike1710-oss)
=
