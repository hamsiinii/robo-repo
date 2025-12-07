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
