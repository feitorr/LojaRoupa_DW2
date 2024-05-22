import React, { useState, useEffect } from "react";
import Sidebar_admin from "../Sidebar_admin/Sidebar_admin";
import "../Stock/Stock.css";
import { createClient } from "@supabase/supabase-js";
import search from "../../img/search.png";
import swal from 'sweetalert';

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";

const supabase = createClient(supabaseUrl, supabaseKey);

const Vendidos = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetchItemsFromSupabase();
  }, []);

  const fetchItemsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("roupa")
        .select("*")
        .eq("estado", "0");
      
      if (error) {
        throw error;
      }
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar itens do Supabase:", error.message);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="admin-container">
      <Sidebar_admin />
      <div className="stock-container">
        <h2>STOCK VENDIDO</h2>

        <div className="buttonCenter">
          <div className="inputPesquisa">
            <input
              type="text"
              placeholder="Pesquisar por título"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <img src={search} alt="Search icon" />
          </div>
        </div>
        <div className="items-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th>Imagem</th>
                <th>Marca</th>
                <th>Gênero</th>
                <th>Preço</th>
                <th>Título</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.categoria}</td>
                  <td>
                    <img
                      src={`https://lelwhxghwolrpmrkeeuw.supabase.co/storage/v1/object/public/imagens/${item.imagem}`}
                      alt="Imagem do item"
                    />
                  </td>
                  <td>{item.marca}</td>
                  <td>{item.genero}</td>
                  <td>{parseFloat(item.preco).toFixed(2)}€</td>
                  <td>{item.titulo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendidos;
