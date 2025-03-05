const API_URL_DEV = import.meta.env['VITE_API_URL'] as string;
const NODE_MODE = import.meta.env['VITE_NODE_MODE'] as string;
const BASE_API_URL_PRODUCTION = import.meta.env['VITE_API_URL_PRODUCTION'] as string;
const AUTH0_DOMAIN = import.meta.env['VITE_DOMAIN'] as string;
const AUTH0_CLIENT_ID = import.meta.env['VITE_CLIENT_ID'] as string;
const AUTH0_AUDIENCE = import.meta.env['VITE_AUDIENCE'] as string;

const BASE_API_URL =
  NODE_MODE === "production" ? BASE_API_URL_PRODUCTION : API_URL_DEV;

export {
  BASE_API_URL,
  NODE_MODE,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_AUDIENCE,
};
