# Frontend Technical Issues and Inconsistencies

This document outlines identified technical issues, inconsistencies, and areas for improvement in the frontend codebase.

---

### 1. Code Inconsistencies

#### **Issue: Inconsistent File Naming Conventions**
- **Description**: There is an inconsistent use of file naming conventions across the `src` directory. For example, validation files use `PascalCase.validation.ts` (e.g., `AddProduct.validation.ts`), while component files use `PascalCase.tsx` (e.g., `ProductForm.tsx`) and some hooks use `camelCase.ts` (e.g., `useProducts.ts`).
- **Improvement**: Standardize on a single naming convention. For React components and hooks, `PascalCase.tsx` is recommended. For other TypeScript files, `camelCase.ts` or `kebab-case.ts` could be used consistently.
- **Files**: 
  - `src/validation/AddProduct.validation.ts`
  - `src/hooks/product/useProducts.ts`
  - `src/components/admin/products/ProductForm.tsx`

#### **Issue: Mixing of `.ts` and `.tsx` for Hooks**
- **Description**: Some hooks are in `.ts` files (e.g., `useProducts.ts`), while others are in `.tsx` files (e.g., `useDashboard.tsx`). Hooks that do not render JSX should be in `.ts` files.
- **Improvement**: Review all hooks and ensure that only those containing JSX use the `.tsx` extension.
- **Files**:
  - `src/hooks/product/useProducts.ts`
  - `src/components/admin/hooks/useDashboard.tsx`

---

### 2. Duplicated or Over-Engineered Logic

#### **Issue: Redundant Image Uploader Components**
- **Description**: There are three separate image uploader components: `DropzoneImageUploader`, `ModalImageUploader`, and `BatchImageUploader`. Their functionalities overlap significantly and could be consolidated.
- **Improvement**: Create a single, more generic `ImageUploader` component that can be configured via props to handle different use cases (e.g., single vs. multiple files, with or without a modal).
- **Files**:
  - `src/components/ui/DropzoneImageUploader.tsx`
  - `src/components/ui/ModalImageUploader.tsx`
  - `src/components/ui/BatchImageUploader.tsx`

---

### 3. Unused or Obsolete Code

#### **Issue: Unused Files**
- **Description**: The file `src/utils/examples.ts` appears to be unused and not imported anywhere in the application. Similarly, there are duplicate `useRecipes.ts` and `useRecipes.tsx` files in `src/hooks/recipe`.
- **Improvement**: Remove unused files to reduce clutter and potential confusion. Consolidate the duplicate `useRecipes` files into one.
- **Files**:
  - `src/utils/examples.ts`
  - `src/hooks/recipe/useRecipes.ts`
  - `src/hooks/recipe/useRecipes.tsx`

---

### 4. Error-Prone or Fragile Patterns

#### **Issue: Manual API Service Definitions**
- **Description**: The project contains manually written API services in `src/providers/api/` (e.g., `ProductService.ts`, `PackageService.ts`). This is redundant given the existence of a generated OpenAPI client in `src/client/` which should be the single source of truth for API interactions.
- **Improvement**: Remove the manual API services and refactor all data-fetching logic to use the generated OpenAPI client. This will reduce maintenance overhead and prevent inconsistencies.
- **Files**:
  - `src/providers/api/ProductService.ts`
  - `src/providers/api/PackageService.ts`
  - `src/client/services.gen.ts`

---

### 5. Over-Segmentation or Complexity

#### **Issue: Overly Granular Admin Hooks**
- **Description**: The `src/components/admin/hooks/` directory contains highly specific hooks for each dashboard section (e.g., `useProductsDashboard`, `usePackagesDashboard`). This leads to code duplication and makes the admin section harder to maintain.
- **Improvement**: Replace these specific hooks with a single generic `useDashboard` or `useAdminData` hook that can be parameterized to handle different data types (products, packages, etc.).
- **Files**:
  - `src/components/admin/hooks/useProductsDashboard.tsx`
  - `src/components/admin/hooks/usePackagesDashboard.tsx`
  - `src/components/admin/hooks/useRecipesDashboard.tsx`

#### **Issue: Fragmented Admin Component Structure**
- **Description**: The `src/components/admin` folder is heavily nested, with separate folders for `hooks`, `packages`, `products`, and `recipes`. This structure is complex and could be simplified.
- **Improvement**: Adopt a more feature-based or domain-driven structure. For example, group all product-related admin components, hooks, and forms under a single `products` directory within `admin`.
- **Files**:
  - `src/components/admin/`

---

### 6. Architecture Alignment

#### **Issue: Dual API Logic Sources**
- **Description**: The application has two sources of API logic: the generated client in `src/client/` and the manual services in `src/providers/api/`. This violates the single source of truth principle and creates confusion.
- **Improvement**: Deprecate and remove the `src/providers/api/` directory. All API calls should be made through the OpenAPI client.
- **Files**:
  - `src/client/`
  - `src/providers/api/`

#### **Issue: Inconsistent Form Handling**
- **Description**: The `useFormUserData` hook is a custom abstraction over React Hook Form. While custom hooks are useful, this one adds an unnecessary layer of indirection when React Hook Form and Zod could be used directly in the components for better clarity and consistency.
- **Improvement**: Refactor forms using `useFormUserData` to directly use `useForm` from React Hook Form with a Zod resolver. This will make the form logic more transparent and align with the documented architecture.
- **Files**:
  - `src/hooks/form/useFormUserData.tsx`
  - `src/components/checkout/CheckoutFormData.tsx`
