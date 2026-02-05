"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
const zod_1 = require("zod");
function errorHandler(err, _req, res, _next) {
    console.error('Error:', err);
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }
    const statusCode = err.status || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}
function notFoundHandler(req, res) {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl
    });
}
//# sourceMappingURL=errorHandler.js.map