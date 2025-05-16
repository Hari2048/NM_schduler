# PBScheduleee - Task Scheduler Application

A beautiful and intuitive task scheduling application built with React, MongoDB, and Express.

## Features

- User authentication with JWT
- Interactive calendar for scheduling tasks
- Task creation, editing, and deletion
- Color-coded task categories and priorities
- Responsive design for all devices
- Real-time task updates

## Tech Stack

- Frontend: React with Vite
- Backend: Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: Custom CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/pbscheduleee.git
cd pbscheduleee
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/pbscheduleee
JWT_SECRET=your_jwt_secret_should_be_long_and_complex
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

4. Run the development server:
```
npm run dev:full
```

## Running in Development

Run both frontend and backend:
```
npm run dev:full
```

Run only the frontend:
```
npm run dev
```

Run only the backend:
```
npm run server
```

## Deployment

1. Build the frontend:
```
npm run build
```

2. Deploy to your preferred hosting service.

## License

This project is licensed under the MIT License.