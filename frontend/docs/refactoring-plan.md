# Frontend Refactoring Plan

This document outlines the strategy for refactoring the frontend to work with the new Nest.js backend. The goal is to improve performance, developer experience, and the overall robustness of the application by adopting a modern, efficient, and maintainable stack.

## Current Architecture and Its Challenges

The current frontend relies on a mix of custom hooks (`useShop`, `useRandomCards`, etc.) and a `GenericService` that manually manage data fetching, loading, and error states using `useState` and `useEffect`. This has led to several challenges:

-   **Data Structure Mismatches:** The hooks are brittle and tightly coupled to specific API response shapes, causing `undefined` errors when the backend response changes slightly.
-   **No Caching:** Every component re-fetchs its own data, leading to redundant network requests and slower page loads.
-   **Complex State Management:** Global state, like the shopping cart, is managed through a Zustand store, but the data fetching logic is scattered and inconsistent.

## Proposed Architecture

To address these challenges, we will refactor the frontend to use the following modern libraries:

1.  **React Query (`@tanstack/react-query`):** For all server state management. It will handle data fetching, caching, refetching, and loading/error states automatically.
2.  **Zustand:** For all global client-side state management. It provides a simple, unopinionated, and powerful way to manage state like the shopping cart or UI state. We will continue to use this for the cart.
3.  **Axios Instance:** A single, centralized Axios instance will be used for all API calls, making it easy to manage the base URL and any future interceptors (e.g., for authentication).
4.  **Generated API Client:** We  will use `openapi-ts` togenerate a fully-typed API client from the `openapi.yaml` provided by the Nest.js backend. This will ensure that the frontend is always in sync with the backend API.

## Benefits of the New Architecture

-   **Performance:** React Query's caching will significantly reduce the number of network requests, making the application feel much faster.
-   **Simplicity:** Data fetching logic will be declarative and co-located with the components that use it, removing the need for complex `useEffect` hooks.
-   **Maintainability:** The separation of server state (React Query) and client state (Zustand) makes the codebase easier to reason about and debug.
-   **Robustness:** React Query automatically handles complex scenarios like background refetching and stale-while-revalidate, making the UI more resilient to network changes.
-   **Type Safety:** The generated API client will provide full type safety between the frontend and backend, reducing the likelihood of runtime errors.

The migration will be performed feature by feature, as outlined in the `todo.md` file, to ensure a smooth and controlled transition.