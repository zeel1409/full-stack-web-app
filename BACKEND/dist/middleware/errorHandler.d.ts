import { Request, Response, NextFunction } from 'express';
export interface ApiError extends Error {
    status?: number;
    code?: string;
}
export declare function errorHandler(err: ApiError, _req: Request, res: Response, _next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function notFoundHandler(req: Request, res: Response): void;
//# sourceMappingURL=errorHandler.d.ts.map