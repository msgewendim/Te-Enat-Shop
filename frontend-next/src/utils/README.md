# Utils Directory

This directory contains utility functions and constants used throughout the application.

## Image Files

The `imageFiles.ts` file exports static imports of all images used in the application. 

### Usage

```tsx
// Import images directly
import { banner, shiro, kitfo } from "@/utils/imageFiles";

// Use with Next.js Image component
import Image from "next/image";

const MyComponent = () => {
  return (
    <Image 
      src={banner} 
      alt="Banner" 
      className="w-full h-auto" 
    />
  );
};
```

### Migrated from Vite

This file was migrated from Vite's dynamic imports:

```tsx
// OLD Vite way (don't use)
const banner = () => import("../assets/banner.png");

// NEW Next.js way
import banner from "../assets/banner.png";
```

### Adding New Images

1. Add your image to the `src/assets` directory
2. Import it in `imageFiles.ts`
3. Export it from the same file
4. Use it with the Next.js Image component

## Other Utilities

- `constants.ts` - Application constants
- `helperFunctions.ts` - Helper functions
- `env.config.ts` - Environment configuration 