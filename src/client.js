import { createClient } from '@supabase/supabase-js';
const URL = 'https://tcyynnaqruwceacionvj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeXlubmFxcnV3Y2VhY2lvbnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0ODE5NTgsImV4cCI6MjAwODA1Nzk1OH0.TgEUAmSqnMEZSjZHTRXdYJiMDhU-Y6wSwLVNVHaYv20';


export const supabase = createClient(URL, API_KEY);