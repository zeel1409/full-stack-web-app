import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare function createTranscript(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getTranscripts(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getTranscript(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateTranscript(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteTranscript(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=transcriptController.d.ts.map