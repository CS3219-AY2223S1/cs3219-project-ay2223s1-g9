export const API_PATH = {
  USER: "/api/user",
  UPDATE_USER: "/api/user/update",
  LOGIN: "/login",
  LOGOUT: "/logout",
  VERIFY_TOKEN: "/verifyToken",

  CREATE_MATCH: "/createMatch",
  DELETE_MATCH: "/deleteMatch/",
};

export const HTTP_METHODS = {
  POST: "post",
  GET: "get",
  UPDATE: "patch",
  DELETE: "delete",
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

export const SOCKET_EVENT = {
  CONNECTION: "connection",
  DISONNECTION: "disconnect",
  MATCH: "match",
  MATCH_SUCCESS: "matchSuccess",
  MATCH_UNSUCCESS: "matchUnsuccess",
};
