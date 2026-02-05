"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = verifyAuth;
const supabase_js_1 = require("../config/supabase.js");
async function verifyAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Missing authorization header' });
        }
        const token = authHeader.substring(7);
        const { data: { user }, error } = await supabase_js_1.supabaseAdmin.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        req.user = {
            id: user.id,
            email: user.email
        };
        next();
    }
    catch (err) {
        console.error('Auth error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=auth.js.map