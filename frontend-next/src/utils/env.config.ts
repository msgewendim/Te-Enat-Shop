const API_URL_DEV = process.env.NEXT_PUBLIC_API_URL as string;
const NODE_MODE = process.env.NODE_ENV as string;
const BASE_API_URL_PRODUCTION = process.env.NEXT_PUBLIC_API_URL_PRODUCTION as string;
const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string;
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string;
const AUTH0_AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE as string;

const BASE_API_URL =
  NODE_MODE === "production" ? BASE_API_URL_PRODUCTION : API_URL_DEV;

export {
  BASE_API_URL,
  NODE_MODE,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_AUDIENCE,
};
