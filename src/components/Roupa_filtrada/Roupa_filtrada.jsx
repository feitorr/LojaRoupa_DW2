import { useEffect, useState } from "react";
import './Roupa_filtrada.css';
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);


const Roupa_filtrada = () => {
    const [roupas, setRoupas] = useState([]);
    var url = window.location.href;
    var regex = /[?&]categoria=([\w!@#$%^&*()-]+)/i;
    var match = regex.exec(url);
    useEffect(() => {
        var categoryId = match[1];
        async function fetchRoupas() {
            console.log(categoryId)
            try {
                const { data, error } = await supabase
                    .from("roupa")
                    .select("*")
                    .eq('categoria', categoryId)
                    .eq('estado', '1')
                if (error) {
                    throw error;
                }
                setRoupas(data);
            } catch (error) {
                console.error("Erro ao buscar roupas:", error.message);
            }
        }

        fetchRoupas();
    }, []); 
    return (
        <>
           <div className="collection" style={{ marginTop: "55px"}}>
                    {roupas.map((roupa, index) => (
                        <Link className="Link"to={`/product?id=${roupa.id}`}>
                        <div className="card" key={index}>
                            <div className="new_collection_img">
                            <img src={roupa.imagem} alt="Roupa" />
                            </div>
                            <p className="category">{roupa.categoria} / {roupa.marca}</p>
                            <h2 className="brand">{roupa.titulo}</h2>
                            <p className="price">{roupa.preco}€</p>
                        </div>
                        </Link>
                    ))}
                </div>
        </>
    );
};

export default Roupa_filtrada;
