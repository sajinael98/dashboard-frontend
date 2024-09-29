import { z } from "zod";

export const sizeSchema = z.object({
    price: z.number().positive(), // Ensure price is a positive number
    size: z.string().min(1).max(10), // Limit size string length to 1-10 characters
});

export const itemSchema = z.object({
    title: z.string().min(1, { message: "required" }),
    categoryId: z.number().min(1, { message: "required" }),
    image: z.string().min(1, { message: "required" }),
    modifiers: z.string().array().default(["extra cheese"]),
    description: z.string().default(""),
    sizes: z.array(sizeSchema).min(1, {message: "sizes must contain at least 1 element"}).default([{ size: "standard", price: 0 }])
})