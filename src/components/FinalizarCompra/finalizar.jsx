import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";

const supabase = createClient(supabaseUrl, supabaseKey);

const FinalizarCompra = async (id, tamanhos) => {
    try {
        const { data: rowData, error: rowError } = await supabase
            .from("roupa")
            .select('tamanho')
            .eq("id", id)
            .single();
        
        if (rowError) {
            throw rowError;
        }
        
        // Converte a lista de tamanhos em um array
        let tamanhoArray = rowData.tamanho.split(',');
        
        // Remove todos os tamanhos recebidos da lista
        tamanhos.forEach(tamanho => {
            tamanhoArray = tamanhoArray.filter(item => item !== tamanho);
        });
        
        // Converte o array de volta para string
        const updatedTamanhos = tamanhoArray.join(',');

        const { data, error } = await supabase
            .from("roupa")
            .update({ tamanho: updatedTamanhos })
            .eq("id", id);
        
        if (error) {
            throw error;
        }
        
        // Verifica se o campo de tamanhos está vazio
        if (updatedTamanhos === '') {
            const { data: updateData, error: updateError } = await supabase
                .from("roupa")
                .update({ estado: '0', cores: null })
                .eq("id", id);
                
            if (updateError) {
                throw updateError;
            }
        }
        
        swal("Sucesso!", "Tamanhos removidos com sucesso.", "success").then(() => {
            // Clear sessionStorage
            sessionStorage.clear();
            // Reload the page
            window.location.reload();
        });
    } catch (error) {
        console.error("Error removing sizes from Supabase:", error.message);
        swal(
            "Error!",
            "Ocorreu um erro ao remover os tamanhos. Por favor, tente novamente",
            "error"
        );
    }
};

export default FinalizarCompra;
