import { z } from 'zod';

export const TeamRegistrationSchema = z.object({
  name: z.string()
    .min(3, "Team name must be at least 3 characters")
    .max(50, "Team name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9 -]+$/, "Team name can only contain alphanumeric characters, spaces, and hyphens"),
  trackId: z.string().uuid("Invalid track ID")
});

export const TeamMemberAddSchema = z.object({
  email: z.string().email("Invalid email format").max(255),
  role: z.enum(['LEADER', 'MEMBER'])
});

export const TaskUpdateSchema = z.object({
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'])
});
