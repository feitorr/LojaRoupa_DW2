import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
