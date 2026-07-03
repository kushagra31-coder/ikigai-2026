import { z } from 'zod';

export const PassScanSchema = z.object({
  passId: z.string().uuid("Invalid pass ID"),
  checkpoint: z.string().min(2, "Checkpoint must be specified").max(100),
  timestamp: z.string().datetime("Must be a valid ISO datetime string")
});

export const PassIssueSchema = z.object({
  profileId: z.string().uuid("Invalid profile ID"),
  passType: z.enum(['PARTICIPANT', 'MENTOR', 'GUEST', 'ORGANIZER', 'VIP'])
});
