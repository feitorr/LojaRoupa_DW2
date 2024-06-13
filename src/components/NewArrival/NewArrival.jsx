import React, { useEffect, useState } from "react";
import "./NewArrival.css";
import { Link } from "react-router-dom";
import supabase from "../supabase/supabase";

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
                <div className="precoDiv">
                                    {roupa.promocao !== null && (
                                        <p className="pricePromocaoo">{parseFloat(roupa.promocao).toFixed(2)}€</p>
                                    )}
                                    <p className="preco">{parseFloat(roupa.preco).toFixed(2)}€</p>
                                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewArrival;
