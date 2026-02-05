import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';
import { createTranscriptSchema, updateTranscriptSchema } from '../utils/validation.js';

export async function createTranscript(req: AuthRequest, res: Response) {
  try {
    const data = createTranscriptSchema.parse(req.body);

    const { data: transcript, error } = await supabaseAdmin
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
  } catch (err) {
    throw err;
  }
}

export async function getTranscripts(req: AuthRequest, res: Response) {
  try {
    const { data: transcripts, error } = await supabaseAdmin
      .from('transcripts')
      .select('*')
      .eq('user_id', req.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(transcripts || []);
  } catch (err) {
    throw err;
  }
}

export async function getTranscript(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const { data: transcript, error } = await supabaseAdmin
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
  } catch (err) {
    throw err;
  }
}

export async function updateTranscript(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const data = updateTranscriptSchema.parse(req.body);

    const { data: transcript, error } = await supabaseAdmin
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
  } catch (err) {
    throw err;
  }
}

export async function deleteTranscript(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('transcripts')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user?.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(204).send();
  } catch (err) {
    throw err;
  }
}
