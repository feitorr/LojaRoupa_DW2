
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { createClient } from "@supabase/supabase-js";
import "./P_graficos.css";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);

const P_graficos = () => {
    
    return(
        <div className="graf">
            <div className="graf_cont">
                
            </div>
        </div>
    );
};

export default P_graficos;
