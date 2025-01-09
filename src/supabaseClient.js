import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfdslcnqutnamgrgitxv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZHNsY25xdXRuYW1ncmdpdHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNTkxNTQsImV4cCI6MjA0ODczNTE1NH0.wc9gOUJ_Zq4kd1QPG0TTgxk-1gYw1DQQWboYcAR8OKY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
