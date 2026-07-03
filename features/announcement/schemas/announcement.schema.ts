import { z } from 'zod';

export const AnnouncementSchema = z.object({
  title: z.string().min(5, "Title too short").max(200, "Title too long"),
  content: z.string().min(10, "Content too short").max(5000, "Content too long"),
  type: z.enum(['GENERAL', 'URGENT', 'TRACK_SPECIFIC', 'RESULT']),
  targetTrackId: z.string().uuid("Invalid track ID").optional()
});
