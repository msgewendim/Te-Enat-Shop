export default {
  client: "@hey-api/client-axios",
  input: "${VITE_API_URL}/api-json",
  output: "src/client",
  types: {
    enums: "typescript",
  },
};
