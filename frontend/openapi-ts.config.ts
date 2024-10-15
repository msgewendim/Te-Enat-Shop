export default {
  client: "@hey-api/client-axios",
  input: "../backend/openapi.yaml",
  output: "src/client",
  types: {
    enums: "typescript",
  },
};
