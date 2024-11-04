import env from "dotenv";
env.config();

const NODE_ENV = process.env.NODE_ENV as string;
// # FRONTEND APP
const APP_REACT_URL = process.env.APP_REACT_URL as string;
// BACK-END APP URL
const BACKEND_APP_URL = process.env.APP_URL as string;
// # DB
const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI as string;

// #  PAYMENT WITH MORNING
const MORNING_PLUGIN_ID = process.env.MORNING_PLUGIN_ID as string;
let MORNING_TOKEN = process.env.MORNING_TOKEN as string;
const MORNING_API_KEY = process.env.MORNING_API_KEY as string;
const MORNING_SECRET_KEY = process.env.MORNING_SECRET_KEY as string;
const MORNING_PAYMENT_FORM_URL = process.env.MORNING_PAYMENT_FORM_URL as string;
const MORNING_GET_TOKEN_URL = process.env.MORNING_GET_TOKEN_URL as string;

// # AUTH0 ENV
const AUTH_SECRET = process.env.AUTH_SECRET as string;
const AUDIENCE = process.env.AUDIENCE as string;
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL as string;
const TOKEN_SIGNING_ALG = process.env.TOKEN_SIGNING_ALG as string;

// # NGROK
const BASE_URL_NGROK = process.env.BASE_URL_NGROK as string;

export {
  NODE_ENV,
  APP_REACT_URL,
  MONGO_ATLAS_URI,
  MORNING_PLUGIN_ID,
  MORNING_API_KEY,
  MORNING_SECRET_KEY,
  MORNING_PAYMENT_FORM_URL,
  MORNING_GET_TOKEN_URL,
  AUTH_SECRET,
  AUDIENCE,
  ISSUER_BASE_URL,
  TOKEN_SIGNING_ALG,
  BASE_URL_NGROK,
  BACKEND_APP_URL,
};
