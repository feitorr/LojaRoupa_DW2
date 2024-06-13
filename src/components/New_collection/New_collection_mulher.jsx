import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../New_collection/New_collection.css";
import supabase from "../supabase/supabase";

const New_collection_homem = () => {
    const [roupas, setRoupas] = useState([]);

    useEffect(() => {
        async function fetchRoupas() {
            try {
                const { data, error } = await supabase
                    .from("roupa")
                    .select("*")
                    .eq('genero', 'Mulher')
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
            <div className="container_nc">
                <h1>NEW COLLECTION</h1>
                <div className="collection">
                    {roupas.map((roupa, index) => (
                        <Link className="Link"to={`/product?id=${roupa.id}`}>
                        <div className="card" key={index}>
                            <div className="new_collection_img">
                            <img src={`https://lelwhxghwolrpmrkeeuw.supabase.co/storage/v1/object/public/imagens/${roupa.imagem}`} alt="Roupa" />
                            </div>
                            <p className="category">{roupa.categoria} / {roupa.marca}</p>
                            <h2 className="brand">{roupa.titulo}</h2>
                            <div className="precoDiv">
                                    {roupa.promocao !== null && (
                                        <p className="pricePromocao">{parseFloat(roupa.promocao).toFixed(2)}€</p>
                                    )}
                                    <p className="price">{parseFloat(roupa.preco).toFixed(2)}€</p>
                                </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default New_collection_homem;
