"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranscript = createTranscript;
exports.getTranscripts = getTranscripts;
exports.getTranscript = getTranscript;
exports.updateTranscript = updateTranscript;
exports.deleteTranscript = deleteTranscript;
const supabase_js_1 = require("../config/supabase.js");
const validation_js_1 = require("../utils/validation.js");
async function createTranscript(req, res) {
    try {
        const data = validation_js_1.createTranscriptSchema.parse(req.body);
        const { data: transcript, error } = await supabase_js_1.supabaseAdmin
            .from('transcripts')
            .insert({
            user_id: req.user?.id,
            text: data.text,
            language: data.language
        })
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json(transcript);
    }
    catch (err) {
        throw err;
    }
}
async function getTranscripts(req, res) {
    try {
        const { data: transcripts, error } = await supabase_js_1.supabaseAdmin
            .from('transcripts')
            .select('*')
            .eq('user_id', req.user?.id)
            .order('created_at', { ascending: false });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json(transcripts || []);
    }
    catch (err) {
        throw err;
    }
}
async function getTranscript(req, res) {
    try {
        const { id } = req.params;
        const { data: transcript, error } = await supabase_js_1.supabaseAdmin
            .from('transcripts')
            .select('*')
            .eq('id', id)
            .eq('user_id', req.user?.id)
            .maybeSingle();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!transcript) {
            return res.status(404).json({ error: 'Transcript not found' });
        }
        res.json(transcript);
    }
    catch (err) {
        throw err;
    }
}
async function updateTranscript(req, res) {
    try {
        const { id } = req.params;
        const data = validation_js_1.updateTranscriptSchema.parse(req.body);
        const { data: transcript, error } = await supabase_js_1.supabaseAdmin
            .from('transcripts')
            .update({
            ...data,
            updated_at: new Date().toISOString()
        })
            .eq('id', id)
            .eq('user_id', req.user?.id)
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!transcript) {
            return res.status(404).json({ error: 'Transcript not found' });
        }
        res.json(transcript);
    }
    catch (err) {
        throw err;
    }
}
async function deleteTranscript(req, res) {
    try {
        const { id } = req.params;
        const { error } = await supabase_js_1.supabaseAdmin
            .from('transcripts')
            .delete()
            .eq('id', id)
            .eq('user_id', req.user?.id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(204).send();
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=transcriptController.js.map