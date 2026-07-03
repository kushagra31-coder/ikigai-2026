import { z } from 'zod';

export const FileMetadataSchema = z.object({
  bucket: z.enum([
    'avatars', 'submissions', 'presentations', 'videos', 
    'documents', 'sponsors', 'logos', 'passes', 'exports', 'assets'
  ]),
  path: z.string().min(1, "Path cannot be empty").max(1024),
  originalName: z.string().min(1).max(255),
  mimeType: z.string().regex(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-+.]+$/, "Invalid MIME type format").max(127),
  size: z.number().positive().max(1073741824, "File exceeds 1GB limit"), // Up to 1GB depending on bucket config
  checksum: z.string().max(255).optional(),
  teamId: z.string().uuid("Invalid team ID").optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE'])
});
