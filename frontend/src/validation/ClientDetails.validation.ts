import { z } from "zod";

export const clientDetailsSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1),
  email: z.string().email("Please enter a valid email"),
  mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
  address: z.string({
    required_error: "Address is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  zip: z.string().optional(),
});
