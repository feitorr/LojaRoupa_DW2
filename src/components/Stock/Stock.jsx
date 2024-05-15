import React, { useState, useEffect } from "react";
import Sidebar_admin from "../Sidebar_admin/Sidebar_admin";
import "./Stock.css";
import { createClient } from "@supabase/supabase-js";
import search from "../../img/search.png";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";

const supabase = createClient(supabaseUrl, supabaseKey);

const Stock = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    categoria: "",
    imagem: "",
    marca: "",
    genero: "",
    titulo: "",
    cores: "",
    tamanho: "",
    preco: "",
    estado: "1", // Definindo o estado padrão como "1"
  });
  const [file, setFile] = useState(null); // Novo estado para armazenar o arquivo carregado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  useEffect(() => {
    fetchItemsFromSupabase();
  }, []);

  const fetchItemsFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from("roupa").select("*");
      if (error) {
        throw error;
      }
      setItems(data);
    } catch (error) {
      console.error("Erro ao buscar itens do Supabase:", error.message);
    }
  };

  const sanitizeFileName = (name) => {
    return name.replace(/[^a-zA-Z0-9-_.]/g, "").replace(/\s+/g, "-");
  };

  const addItem = async () => {
    try {
      // Renomear o nome do arquivo
      let fileName = sanitizeFileName(file.name);
      const { data: existingFiles, error: fileError } = await supabase.storage
        .from("imagens")
        .list();

      if (fileError) {
        throw fileError;
      }

      // Verificar se o nome do arquivo já existe
      let count = 1;
      let originalFileName = fileName;
      while (existingFiles.some((f) => f.name === fileName)) {
        fileName = `${originalFileName}_${count}`;
        count++;
      }

      // Carregar a imagem para o armazenamento do Supabase na pasta "imagens"
      const { data: fileData, error: uploadError } = await supabase.storage
        .from("imagens")
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obter a URL da imagem carregada
      const imageUrl = fileData.path;

      // Adicionar o novo item com a URL da imagem ao Supabase
      const { data, error } = await supabase
        .from("roupa")
        .insert([{ ...newItem, imagem: imageUrl }]);
      if (error) {
        throw error;
      }
      setItems([...items, data[0]]);
      setNewItem({
        categoria: "",
        imagem: "",
        marca: "",
        genero: "",
        titulo: "",
        cores: "",
        tamanho: "",
        preco: "",
        estado: "1", // Definindo o estado padrão como "1"
      });
      setFile(null); // Limpa o arquivo carregado
      // Após adicionar, buscar novamente os itens do Supabase para atualizar a tabela
      fetchItemsFromSupabase();
    } catch (error) {
      console.error("Erro ao adicionar item ao Supabase:", error.message);
    }
  };

  const sortByItemId = (a, b) => {
    return a.id - b.id;
  };

  const deleteItem = async (id) => {
    try {
      await supabase.from("roupa").delete().eq("id", id);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir item do Supabase:", error.message);
    }
  };

  const displayModal = () => {
    var modal = document.getElementById("add-item");
    modal.classList.toggle("showed");
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="admin-container">
      <Sidebar_admin />
      <div className="stock-container">
        <h2>GERIR STOCK</h2>

        <div className="buttonCenter">
          <div className="inputPesquisa">
            <input
              type="text"
              placeholder="Pesquisar por título"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <img src={search}></img>
          </div>
          <button onClick={displayModal} className="adicionarmodal">
            Adicionar
          </button>
        </div>
        <div className="add-item" id="add-item">
          <span className="closebutton" onClick={displayModal}>
            X
          </span>
          <h2>Adicionar Itens</h2>
          <input
            type="text"
            placeholder="Título"
            value={newItem.titulo}
            onChange={(e) => setNewItem({ ...newItem, titulo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Categoria"
            value={newItem.categoria}
            onChange={(e) =>
              setNewItem({ ...newItem, categoria: e.target.value })
            }
          />
          <input
            type="file" // Alterado para um campo de arquivo
            onChange={(e) => setFile(e.target.files[0])} // Armazena o arquivo carregado no estado
          />
          <input
            type="text"
            placeholder="Marca"
            value={newItem.marca}
            onChange={(e) => setNewItem({ ...newItem, marca: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gênero"
            value={newItem.genero}
            onChange={(e) => setNewItem({ ...newItem, genero: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cores"
            value={newItem.cores}
            onChange={(e) => setNewItem({ ...newItem, cores: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tamanhos"
            value={newItem.tamanho}
            onChange={(e) =>
              setNewItem({ ...newItem, tamanho: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Preço"
            value={newItem.preco}
            onChange={(e) => setNewItem({ ...newItem, preco: e.target.value })}
          />
          <button onClick={addItem}>Adicionar Item</button>
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
                <th>Cores</th>
                <th>Tamanhos</th>
                <th>Preço</th>
                <th>Título</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) =>
                  item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort(sortByItemId)
                .map((item) => (
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
                    <td>{item.cores}</td>
                    <td>{item.tamanho}</td>
                    <td>{item.preco}</td>
                    <td>{item.titulo}</td>
                    <td>
                      <button onClick={() => deleteItem(item.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stock;
