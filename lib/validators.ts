import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

//schema for inserting products
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email  address"),
  password: z.string().min(6, "password must be at least 6 characters."),
});

// schema for signup users
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email  address"),
    password: z.string().min(6, "password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"],
  });

// card schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be positive"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

export const insertCardSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session card id is required"),
  userId: z.string().optional().nullable(),
});

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be a least 3 characters"),
  streetAddress: z.string().min(3, "Address must be a least 3 characters"),
  city: z.string().min(3, "City must be a least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be a least 3 characters"),
  country: z.string().min(3, "Country must be a least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
