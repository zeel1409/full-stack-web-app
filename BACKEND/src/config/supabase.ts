

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 'supabase' ki jagah 'supabaseAdmin' export karein
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface Transcript {
  id: string;
  user_id: string;
  text: string;
  language: string;
  created_at: string;
  updated_at: string;
}