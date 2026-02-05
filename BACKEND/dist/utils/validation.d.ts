import { z } from 'zod';
export declare const createTranscriptSchema: z.ZodObject<{
    text: z.ZodString;
    language: z.ZodDefault<z.ZodEnum<["en", "hi"]>>;
}, "strip", z.ZodTypeAny, {
    text: string;
    language: "en" | "hi";
}, {
    text: string;
    language?: "en" | "hi" | undefined;
}>;
export declare const updateTranscriptSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodEnum<["en", "hi"]>>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    language?: "en" | "hi" | undefined;
}, {
    text?: string | undefined;
    language?: "en" | "hi" | undefined;
}>;
export type CreateTranscriptInput = z.infer<typeof createTranscriptSchema>;
export type UpdateTranscriptInput = z.infer<typeof updateTranscriptSchema>;
//# sourceMappingURL=validation.d.ts.map