

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

Example:

```
<img width="1502" height="405" alt="W5_SchemaDiagram_26100168" src="https://github.com/user-attachments/assets/36f09f1b-384b-4f57-bd79-032670910473" />

```


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




# Future Improvements

- AI sentiment analysis
- Dashboard analytics
- Authentication
- Review filtering
- Export reports

---

# Author

Gauri sharma
