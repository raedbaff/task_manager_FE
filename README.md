# Task Manager — React Frontend

A simple **React** application for managing tasks.  
Connects to a REST API backend (e.g., Spring Boot).

---

## Features

- Create, read, update, delete tasks  
- Input validation using React Hook Form  
- Responsive UI  
- Clean component structure  
- Uses lucide-react icons  

---

## Requirements

- Node.js (v18+)  
- npm or yarn  
- A running backend API  
  - Default backend URL: `http://localhost:8080`

---

## Getting Started

**Note:** Make sure the backend is running first, you can follow the guide right here [backend](https://github.com/raedbaff/task_manager_BE/tree/main).
```bash
git clone https://github.com/raedbaff/task_manager_FE.git
cd task_manager_FE
```

## Run Options
### Option 1: Run with Docker Compose (Recommened)
The project already includes a `docker-compose.yml` file. You **do not need to build anything** — the Docker image is public on Docker Hub.  

To run the app:
1. Make sure Docker and Docker Compose are installed. 
2. In the project root, run:

```bash
docker-compose up -d
```
3. Access the App:
- http://localhost:5173

### Option 2: Run Normally (without Docker)
1. Install dependencies:

```bash
npm install
```
2. Create .env file 
```bash
VITE_BE_URL="http://localhost:8080"
```
3. Run the application:
```bash
npm run dev
```
4. Access the App:
- http://localhost:5173
