import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exeydhrvqpqcgbwoawpj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZXlkaHJ2cXBxY2did29hd3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNDc5NzgsImV4cCI6MjA4NzcyMzk3OH0.MXxoqV-wgrG_YYRCH2kLzXFL3s9Eq8KBA51OuuhEDug'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);