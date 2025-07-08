# Frontend Refactor Roadmap

## ✅ Phase 1: Unified API Client

### 1. Setup
- [ ] Create a `src/lib/axios.ts` file that exports a pre-configured Axios instance (with baseURL, headers, and interceptors if needed)
- [ ] Create a generic `src/lib/apiClient.ts` that wraps Axios and exposes typed CRUD methods: `getAll`, `getById`, `create`, `update`, `delete`

### 2. Replace Manual API Services
- [ ] Deprecate or remove files in `src/providers/api/` (e.g., `ProductService.ts`, `PackageService.ts`)
- [ ] Refactor `useProducts`, `usePackages`, `useOrders`, etc., to use the new `apiClient` or OpenAPI client only

### 3. Integrate into Hooks
- [ ] Update all TanStack Query hooks (e.g., `useProducts`, `usePackagesDashboard`) to fetch data through the unified client
- [ ] Ensure all mutation functions use the generic client and return proper typings

### 4. Consistency and Types
- [ ] Define shared request/response types in `src/types/` if not using OpenAPI-generated types
- [ ] Ensure all endpoints conform to a RESTful structure with clear naming and error handling

### 5. Developer Experience
- [ ] Add centralized error logging in Axios interceptors
- [ ] Support auth headers injection (e.g., from Auth0) for secured routes

📝 **Notes**
- Prefer using the OpenAPI client where possible for full type safety
- This refactor prepares the codebase for later phases: simplifying forms, hooks, state, and UI architecture
- Align with architecture goals outlined in `docs/overview.md` and fix inconsistencies listed in `docs/issues.md`