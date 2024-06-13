import { useEffect, useState } from "react";
import './Roupa_filtrada.css';
import { Link } from "react-router-dom";
import supabase from "../supabase/supabase";


const Roupa_filtrada = () => {
    const [roupas, setRoupas] = useState([]);

    useEffect(() => {
        console.log("Fetching data...");
        var url = window.location.href;
        console.log("URL:", url);
        var categoriaRegex = /[?&]categoria=([\w!@#$%^&*()-]+)/i;
        var generoRegex = /[?&]genero=([\w!@#$%^&*()-]+)/i;
        var categoriaMatch = categoriaRegex.exec(url);
        var generoMatch = generoRegex.exec(url);

        var categoryId = categoriaMatch ? categoriaMatch[1] : null;
        var generoid = generoMatch ? generoMatch[1] : null;

        console.log("Category ID:", categoryId);
        console.log("Genero ID:", generoid);

        if (categoryId && generoid) {
            async function fetchRoupas() {
                try {
                    const { data, error } = await supabase
                        .from("roupa")
                        .select("*")
                        .eq('categoria', categoryId)
                        .eq('estado', '1')
                        .eq('genero', generoid);
                    if (error) {
                        throw error;
                    }
                    console.log("Data fetched:", data);
                    setRoupas(data);
                } catch (error) {
                    console.error("Erro ao buscar roupas:", error.message);
                }
            }

            fetchRoupas();
        }
    }, []);

    return (
        <>
            <div className="collection_rf" style={{ marginTop: "55px" }}>
                {roupas.map((roupa, index) => (
                    <Link className="Link" to={`/product?id=${roupa.id}`} key={index}>
                        <div className="card">
                            <div className="new_collection_img">
                                <img src={`https://lelwhxghwolrpmrkeeuw.supabase.co/storage/v1/object/public/imagens/${roupa.imagem}`} alt="Roupa" />
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
