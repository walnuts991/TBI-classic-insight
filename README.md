

# Classic Insight - AI Powered Hotel Review Analyzer

## Overview

Classic Insight is a full-stack web application that helps hotels collect, manage, and analyze guest reviews. Users can upload reviews through CSV files, paste multiple reviews, or manually enter individual reviews. The application stores the reviews in MongoDB and prepares them for AI-powered sentiment analysis and dashboard visualization.

---

## Features

- Upload hotel reviews using CSV
- Paste multiple reviews at once
- Manual review submission
- Store reviews in MongoDB Atlas
- RESTful CRUD APIs
- Interactive dashboard
- AI review analysis workflow (in progress)

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Tools
- Postman
- Git
- GitHub

---

# Database Choice

I selected **MongoDB Atlas** because the application stores hotel reviews as document-based data. Reviews can vary in length and content, making MongoDB's flexible schema a suitable choice. Atlas also provides a free cloud-hosted database that integrates easily with Mongoose.

---

# Database Schema

## Entity: Review

| Field | Type |
|--------|------|
| _id | ObjectId |
| hotel | String |
| review | String |
| rating | Number |
| sentiment | String |
| createdAt | Date |

> Insert your **Schema Diagram image here**

Example:

```
docs/schema.png
```

or

```markdown
![Schema Diagram](docs/schema.png)
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/reviews | Get all reviews |
| GET | /api/reviews/:id | Get single review |
| POST | /api/reviews | Create review |
| PUT | /api/reviews/:id | Update review |
| DELETE | /api/reviews/:id | Delete review |

---

# Project Structure

```
frontend/
backend/
│
├── models/
├── routes/
├── controllers/
├── server.js
├── package.json
└── .env
```

---

# Setup Database

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

Frontend

```bash
npm install
```

Backend

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm start
```

---

# Environment Variables

Create a `.env.example` file.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do **not** commit your actual `.env` file.

---

# Future Improvements

- AI sentiment analysis
- Dashboard analytics
- Authentication
- Review filtering
- Export reports

---

# Author

Gauri Jain
