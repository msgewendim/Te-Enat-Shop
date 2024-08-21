import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: '../backend/openapi.yaml',
  output: 'src/client',
  types: {
    enums: 'typescript',
  },

});