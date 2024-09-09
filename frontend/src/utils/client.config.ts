import { createClient } from '@hey-api/client-fetch';
import { client } from '../client/services.gen';


client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL_PRODUCTION,
  headers: {
    'Content-Type': 'application/json',
  },
  fetch,
});
export const localClient = createClient({
  baseUrl: import.meta.env.VITE_API_URL_PRODUCTION,
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