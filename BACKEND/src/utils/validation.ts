import { z } from 'zod';

export const createTranscriptSchema = z.object({
  text: z.string().min(1, 'Text is required').max(10000, 'Text is too long'),
  language: z.enum(['en', 'hi']).default('en')
});

export const updateTranscriptSchema = z.object({
  text: z.string().min(1, 'Text is required').max(10000, 'Text is too long').optional(),
  language: z.enum(['en', 'hi']).optional()
});

export type CreateTranscriptInput = z.infer<typeof createTranscriptSchema>;
export type UpdateTranscriptInput = z.infer<typeof updateTranscriptSchema>;
