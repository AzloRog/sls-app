import { createClient } from "@supabase/supabase-js";
import { Database } from "./store/types/database.types";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
