## Robo-repo
REST API for robot registration, status updates, retrieval, logs, and vision results.
## Endpoints
- `POST /robots` - create a robot. JSON: `{ name, type, status?, id? }`
- `PATCH /robots/:id/status` - update robot battery/location/mode/error. JSON: `{ battery?, location?, mode?, error? }`
- `GET /robots` - list all robots
- `GET /robots/:id` - get robot details
- `POST /robots/:id/logs` - add a log. JSON: `{ level?, message, meta? }`
- `GET /robots/:id/logs` - get logs for a robot
- `POST /vision/results` - store vision result. JSON: `{ robotId, result, meta? }`
- `GET /vision/results` - list all vision results

## Systen Diagram
    
<img width="1024" height="768" alt="img" src="https://github.com/user-attachments/assets/40110d07-a23a-413c-b1de-d97769195443" />

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: In-memory data store
- **Dependencies**: express, dotenv, uuid

## Project Structure
```
robot-api/
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── models/          # Data storage
│   ├── middleware/      # Error handling & validation
│   └── utils/           # Helper functions
├── server.js            # Application entry point
├── package.json         # Dependencies
├── .env                 # Environment variables
└── README.md            # Documentation
```
## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. **Clone or download the project**
```bash cd robot-api
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   The `.env` file should contain:
```env
   PORT=3000
   NODE_ENV=development
```

4. **Start the server**
   
   Development mode (with auto-restart):
```bash npm run dev
```
   
   Production mode:
```bash
   npm start
```

5. **Verify the server is running**
```bash
   curl http://localhost:3000
```

## Future Enhancements

- [ ] Add database persistence (MongoDB/PostgreSQL)
- [ ] Implement authentication & authorization
