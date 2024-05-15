import React, { useEffect, useState } from "react";
import "./NewArrival.css";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);

const NewArrival = () => {
  const [roupas, setRoupas] = useState([]);

  useEffect(() => {
    async function fetchRoupas() {
      try {
        const { data: allRoupas, error } = await supabase
          .from("roupa")
          .select("*")
          .eq('genero', 'Homem')
          .eq('estado', '1');
        if (error) {
          throw error;
        }

        const selectedIndices = [];
        while (selectedIndices.length < 4) {
          const randomIndex = Math.floor(Math.random() * allRoupas.length);
          if (!selectedIndices.includes(randomIndex)) {
            selectedIndices.push(randomIndex);
          }
        }
        const randomRoupas = selectedIndices.map(index => allRoupas[index]);
        setRoupas(randomRoupas);
      } catch (error) {
        console.error("Erro ao buscar roupas:", error.message);
      }
    }

    fetchRoupas();
  }, []);

  const handleLinkClick = (id) => {
    window.location.href = `/product?id=${id}`;
  };

  return (
    <>
      <div className="allnew">
        <h1>Novos Lançamentos</h1>
        <div className="newarrival">
          {roupas.map((roupa, index) => (
            <div className="cardd" key={index} onClick={() => handleLinkClick(roupa.id)}>
              <div className="carddcontent">
                <div className="carddimage">
                  <img src={`https://lelwhxghwolrpmrkeeuw.supabase.co/storage/v1/object/public/imagens/${roupa.imagem}`} alt="Roupa" />
                </div>
                <p className="category">{roupa.categoria} / {roupa.marca}</p>
                <h2 className="brand">{roupa.titulo}</h2>
                <p className="preco">{roupa.preco}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewArrival;
