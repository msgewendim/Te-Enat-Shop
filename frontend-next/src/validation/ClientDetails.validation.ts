import { z } from "zod";

export const clientDetailsSchema = z.object({
	firstName: z
		.string({
			required_error: "First name is required",
		})
		.min(1),
	lastName: z
		.string({
			required_error: "Last name is required",
		})
		.min(1),
	email: z.string().email("Please enter a valid email"),
	phone: z.string().min(10, "Mobile number must be at least 10 characters"),
	address: z.object({
		street: z.string({
			required_error: "street is required",
		}),
		streetNum: z.string({
			required_error: "street number is required",
		}),
		city: z.string({
			required_error: "city is required",
		}),
		postal_code: z.string().optional(),
	}),
	notes: z.string().optional(),
});
