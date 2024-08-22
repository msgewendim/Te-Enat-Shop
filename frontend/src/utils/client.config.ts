import { createClient } from '@hey-api/client-fetch';
import { client } from '../client/services.gen';

const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:3005/api";

client.setConfig({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  fetch,
});
export const localClient = createClient({
  baseUrl: 'http://localhost:3005/api',
  headers: {
    Authorization: 'Bearer <token_from_local_client>',
    'Content-Type': 'application/json',
  },
})
localClient.interceptors.request.use((req, options) => {
  if (
    options.url === '/products/{id}' &&
    options.method === 'GET'
  ) {
    req.headers.set('Authorization', 'Bearer <token_from_interceptor>');
  }
  return req
})