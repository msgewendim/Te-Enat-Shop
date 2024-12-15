import env from "dotenv";
env.config();

const NODE_ENV = process.env.NODE_ENV as string;

// # FRONTEND APP
const APP_REACT_URL = process.env.APP_REACT_URL as string;
const FRONTEND_URL_ON_RENDER = process.env.FRONTEND_URL_ON_RENDER as string;
const FRONTEND_URL_DEVELOPMENT = process.env.FRONTEND_URL_DEVELOPMENT as string;
const FRONTEND_URL_PRODUCTION = process.env.FRONTEND_URL_PRODUCTION as string;

// BACK-END APP URL
const BACKEND_APP_URL = process.env.APP_URL as string;

// # DB
const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI as string;

// #  PAYMENT WITH MORNING
const I_COUNT_API_URL = process.env.I_COUNT_API_URL as string;
const I_COUNT_USER = process.env.I_COUNT_USER as string;
const I_COUNT_CID = process.env.I_COUNT_CID as string;
const I_COUNT_PASS = process.env.I_COUNT_PASS as string;
let I_COUNT_SESSION_ID = process.env.I_COUNT_SESSION_ID || "";
let I_COUNT_API_ACCESS_TOKEN = process.env.I_COUNT_API_ACCESS_TOKEN || "";
let I_COUNT_API_REFRESH_TOKEN = process.env.I_COUNT_API_REFRESH_TOKEN || "";
let I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT = process.env.I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT || "";

// # AUTH0 ENV
const AUTH_SECRET = process.env.AUTH_SECRET as string;
const AUDIENCE = process.env.AUDIENCE as string;
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL as string;
const TOKEN_SIGNING_ALG = process.env.TOKEN_SIGNING_ALG as string;

// # NGROK
const BASE_URL_NGROK = process.env.BASE_URL_NGROK as string;

const FRONTEND_URL =
  NODE_ENV === "production" ? APP_REACT_URL : "http://localhost:5173";
export {
  NODE_ENV,
  APP_REACT_URL,
  MONGO_ATLAS_URI,
  I_COUNT_API_URL,
  I_COUNT_USER,
  I_COUNT_CID,
  I_COUNT_PASS,
  I_COUNT_SESSION_ID,
  I_COUNT_API_ACCESS_TOKEN,
  I_COUNT_API_REFRESH_TOKEN,
  I_COUNT_API_ACCESS_TOKEN_EXPIRES_AT,
  AUTH_SECRET,
  AUDIENCE,
  ISSUER_BASE_URL,
  TOKEN_SIGNING_ALG,
  BASE_URL_NGROK,
  BACKEND_APP_URL,
  FRONTEND_URL,
  FRONTEND_URL_ON_RENDER,
  FRONTEND_URL_DEVELOPMENT,
  FRONTEND_URL_PRODUCTION,
};
