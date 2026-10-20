import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  'https://nueoavwserwatdpnovmn.supabase.co';

const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('SUPABASE URL:', supabaseUrl);
console.log('SUPABASE KEY EXISTS:', !!supabaseKey);

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);