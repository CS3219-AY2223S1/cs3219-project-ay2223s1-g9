export default {
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:8000",
  MATCHING_SERVICE_URL:
    process.env.MATCHING_SERVICE_URL || "http://localhost:8001",
  QUESTION_SERVICE_URL:
    process.env.QUESTION_SERVICE_URL || "http://localhost:8002",
  COLLABORATION_SERVICE_URL:
    process.env.COLLABORATION_SERVICE_URL || "http://localhost:8003",
  HISTORY_SERVICE_URL:
    process.env.HISTORY_SERVICE_URL || "http://localhost:8004",
};
