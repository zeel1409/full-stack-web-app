"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const transcriptController_js_1 = require("../controllers/transcriptController.js");
const router = (0, express_1.Router)();
router.post('/', auth_js_1.verifyAuth, transcriptController_js_1.createTranscript);
router.get('/', auth_js_1.verifyAuth, transcriptController_js_1.getTranscripts);
router.get('/:id', auth_js_1.verifyAuth, transcriptController_js_1.getTranscript);
router.patch('/:id', auth_js_1.verifyAuth, transcriptController_js_1.updateTranscript);
router.delete('/:id', auth_js_1.verifyAuth, transcriptController_js_1.deleteTranscript);
exports.default = router;
//# sourceMappingURL=transcripts.js.map