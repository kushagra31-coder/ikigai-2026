import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(100)
});

export const ProfileUpdateSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
  university: z.string().max(100).optional(),
  bio: z.string().max(500).optional()
});
