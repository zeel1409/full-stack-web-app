"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTranscriptSchema = exports.createTranscriptSchema = void 0;
const zod_1 = require("zod");
exports.createTranscriptSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, 'Text is required').max(10000, 'Text is too long'),
    language: zod_1.z.enum(['en', 'hi']).default('en')
});
exports.updateTranscriptSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, 'Text is required').max(10000, 'Text is too long').optional(),
    language: zod_1.z.enum(['en', 'hi']).optional()
});
//# sourceMappingURL=validation.js.map