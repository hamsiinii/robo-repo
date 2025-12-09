## Robo-repo
REST API for robot registration, status updates, retrieval, logs, and vision results.
## Endpoints
- `POST /api/robots` - Create a new robot
- `GET /api/robots` - Get all robots
- `GET /api/robots/:id` - Get specific robot details
- `PATCH /api/robots/:id/status` - Update robot status
- `DELETE /api/robots/:id` - Delete a robot
- `POST /api/vision/results` - Store vision analysis result
- `GET /api/vision/results` - Get all vision results
- `GET /api/vision/results/:robotId` - Get vision results for specific robot
- `POST /api/logs` - Create a log entry
- `GET /api/logs` - Get all logs (with optional filters)
- `GET /api/logs/:robotId` - Get logs for specific robot

## Systen Diagram
    
<img width="1024" height="768" alt="img" src="https://github.com/user-attachments/assets/40110d07-a23a-413c-b1de-d97769195443" />

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: In-memory data store
- **Dependencies**: express, dotenv, uuid

## Project Structure
```
robo-repo/
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
```bash
   cd robo-repo
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
```bash
   npm run dev
```
   
   Production mode:
```bash
   npm start
```

5. **Verify the server is running**
```bash
   curl http://localhost:3000
```

## Testing Examples

### Using cURL

**Create a robot:**
```bash
curl -X POST http://localhost:3000/api/robots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TestBot-001",
    "type": "warehouse",
    "status": {
      "battery": 85,
      "mode": "active"
    }
  }'
```

**Get all robots:**
```bash
curl http://localhost:3000/api/robots
```

**Update robot status:**
```bash
curl -X PATCH http://localhost:3000/api/robots/{ROBOT_ID}/status \
  -H "Content-Type: application/json" \
  -d '{
    "battery": 60,
    "mode": "charging"
  }'
```

**Create vision result:**
```bash
curl -X POST http://localhost:3000/api/vision/results \
  -H "Content-Type: application/json" \
  -d '{
    "robotId": "{ROBOT_ID}",
    "detections": [
      {"object": "box", "confidence": 0.95}
    ],
    "confidence": 0.92
  }'
```

**Get logs for a robot:**
```bash
curl http://localhost:3000/api/logs/{ROBOT_ID}
```

---

## Future Enhancements

- [ ] Add database persistence (MongoDB/PostgreSQL)
- [ ] Implement authentication & authorization
