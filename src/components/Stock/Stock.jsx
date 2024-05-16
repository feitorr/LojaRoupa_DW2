import React, { useState, useEffect } from "react";
import Sidebar_admin from "../Sidebar_admin/Sidebar_admin";
import "./Stock.css";
import { createClient } from "@supabase/supabase-js";
import search from "../../img/search.png";
import swal from "sweetalert";
import { MultiSelect } from "primereact/multiselect";
import deleteIcon from "../../img/delete.png"
import discount from "../../img/discount-tag.png"

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
      const { data, error } = await supabase
        .from("roupa")
        .select("*")
        .eq("estado", "1");
      
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
      // Exibir mensagem de carregamento
      swal({
        title: "Aguarde...",
        text: "Adicionando item...",
        icon: "info",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
      });

      // Renomear o nome do arquivo
      let fileName = sanitizeFileName(file.name);
      const { data: existingFiles, error: fileError } = await supabase.storage
        .from("imagens")
        .list();

      if (fileError) {
        throw fileError; // Lançar erro se houver problema ao listar arquivos
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
        throw uploadError; // Lançar erro se houver problema ao carregar a imagem
      }

      // Obter a URL da imagem carregada
      const imageUrl = fileData.path;

      // Converter a lista de categorias em uma string separada por vírgulas
      const categoriasString = newItem.categoria
        .map((categoria) => categoria.name)
        .join(",");
      // Converter a lista de cores em uma string separada por vírgulas
      const coresString = newItem.cores.map((cor) => cor.name).join(",");
      // Converter a lista de tamanhos em uma string separada por vírgulas
      const tamanhosString = newItem.tamanho
        .map((tamanho) => tamanho.name)
        .join(",");
      // Obter o gênero selecionado
      const generoString = newItem.genero
        .map((genero) => genero.name)
        .join(",");

      // Adicionar o novo item com a URL da imagem e categorias como string ao Supabase
      const { data: insertedData, error: insertError } = await supabase
        .from("roupa")
        .insert([
          {
            ...newItem,
            categoria: categoriasString,
            cores: coresString,
            tamanho: tamanhosString,
            genero: generoString,
            imagem: imageUrl,
          },
        ]);

      if (insertError) {
        throw insertError; // Lançar erro se houver problema ao adicionar item ao Supabase
      }

      // Se tudo ocorreu bem, exibir mensagem de sucesso
      swal("Sucesso!", "Item adicionado com sucesso!", "success");

      // Atualizar a lista de itens e redefinir estado
      await fetchItemsFromSupabase(); // Utilizando await aqui
      if (insertedData && insertedData.length > 0) {
        setItems([...items, insertedData[0]]);
      }
      setNewItem({
        categoria: [],
        imagem: "",
        marca: "",
        genero: [],
        titulo: "",
        cores: [],
        tamanho: [],
        preco: "",
        estado: "1", // Definindo o estado padrão como "1"
      });
      setFile(null);
    } catch (error) {
      console.error("Erro ao adicionar item ao Supabase:", error.message);
      swal("Erro!", "Ocorreu um erro ao adicionar o item.", "error");
    }
  };

  const sortByItemId = (a, b) => {
    return a.id - b.id;
  };
  const obterPrecoPorId = (id) => {
    const item = items.find(item => item.id === id);
    return item ? item.preco : undefined;
};
const addPromo = async (id) => {
  const precoAtual = obterPrecoPorId(id);

  if (precoAtual !== undefined) {
      swal({
          title: "Adicionar uma promoção:",
          text: `Preço atual: ${precoAtual}€`,
          content: {
              element: "input",
              attributes: {
                  placeholder: "Insira o novo preço...",
                  value: precoAtual // Define o valor inicial como o preço atual
              },
          },
          buttons: {
              cancel: "Cancelar",
              confirm: {
                  text: "Salvar",
                  closeModal: false,
              },
          },
      })
      .then(async (value) => {
          if (value !== null) { // Verifica se o valor não é nulo
              if (value !== "") {
                  if (parseFloat(value) <= parseFloat(precoAtual)) {
                      // Atualiza o preço e a promoção no Supabase
                      try {
                          await supabase.from("roupa").update({ preco: value, promocao: precoAtual }).eq("id", id);
                          swal("Sucesso", "Preço atualizado com sucesso!", "success");
                          // Atualiza a lista de itens para refletir a alteração
                          await fetchItemsFromSupabase();
                      } catch (error) {
                          console.error("Erro ao atualizar o preço no Supabase:", error.message);
                          swal("Erro", "Ocorreu um erro ao atualizar o preço.", "error");
                      }
                  } else {
                      // Se o novo preço for maior que o preço atual, defina a promoção como nula
                      try {
                          await supabase.from("roupa").update({ preco: value, promocao: null }).eq("id", id);
                          swal("Sucesso", "Preço atualizado com sucesso!", "success");
                          // Atualiza a lista de itens para refletir a alteração
                          await fetchItemsFromSupabase();
                      } catch (error) {
                          console.error("Erro ao atualizar o preço no Supabase:", error.message);
                          swal("Erro", "Ocorreu um erro ao atualizar o preço.", "error");
                      }
                  }
              } else {
                  swal("Aviso", "Nenhum novo preço inserido", "warning");
              }
          } else {
              swal("Aviso", "Operação cancelada", "info");
          }
      });
  } else {
      swal("Erro", "Preço não encontrado para o ID especificado", "error");
  }
}





  const deleteItem = async (id) => {
    swal({
      title: "Tens a certeza?",
      text: "Uma vez apagado não vai ser possível recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("A apagar...", {
          buttons: false,
          closeOnClickOutside: false,
          closeOnEsc: false,
        });
        try {
          await supabase.from("roupa").delete().eq("id", id);
          setItems(items.filter((item) => item.id !== id));
          swal("Sucesso!", "Item apagado com sucesso.", "success");
        } catch (error) {
          console.error("Error deleting item from Supabase:", error.message);
          swal(
            "Error!",
            "Ocorreu um erro ao apagar. Por favor, tente novamente",
            "error"
          );
        }
      } else {
        swal("Cancelado");
      }
    });
  };

  const handleFileChange = (event) => {
      var imgBorder = document.getElementById("imgBorder");
      imgBorder.style.borderBottom = "1px solid #ccc";
      
      var imgText = document.getElementById("addImg");
      imgText.style.display = "none";
      
    const fileUploadInput = event.target;

    if (!fileUploadInput.files[0]) {
      return;
    }

    const image = fileUploadInput.files[0];

    if (!image.type.includes("image")) {
      return alert("Only images are allowed!");
    }

    if (image.size > 10_000_000) {
      return alert("Maximum upload size is 10MB!");
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = (fileReaderEvent) => {
      const profilePicture = document.querySelector(".profile-picture");
      profilePicture.style.backgroundImage = `url(${fileReaderEvent.target.result})`;
    };

    setFile(image);
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
            <img src={search} alt="Search icon" />
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
          <div className="profile-picture" id="imgBorder">
            <h1 className="upload-icon">
              <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
            </h1>
            <input
              className="file-uploader"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <p id="addImg">Adicionar imagem</p>
          <input
            type="text"
            placeholder="Título"
            value={newItem.titulo}
            onChange={(e) => setNewItem({ ...newItem, titulo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Marca"
            value={newItem.marca}
            onChange={(e) => setNewItem({ ...newItem, marca: e.target.value })}
          />
          <input
            type="text"
            placeholder="Preço"
            value={newItem.preco}
            onChange={(e) => setNewItem({ ...newItem, preco: e.target.value })}
          />
          <MultiSelect
            value={newItem.genero}
            onChange={(e) => setNewItem({ ...newItem, genero: e.value })}
            options={[{ name: "Homem" }, { name: "Mulher" }]}
            optionLabel="name"
            placeholder="Selecione o Género"
            maxSelectedLabels={1}
            className="drop"
          />
          <MultiSelect
            value={newItem.categoria}
            onChange={(e) => setNewItem({ ...newItem, categoria: e.value })}
            options={[
              { name: "T-shirt" },
              { name: "Sweats" },
              { name: "Casacos" },
              { name: "Jeans" },
              { name: "Chapeus" },
              { name: "Saias" },
              { name: "Tops" },
              { name: "Vestidos" },
            ]}
            optionLabel="name"
            placeholder="Selecione a Categoria"
            maxSelectedLabels={1}
            className="drop"
          />
          <MultiSelect
            value={newItem.cores}
            onChange={(e) => setNewItem({ ...newItem, cores: e.value })}
            options={[
              { name: "branco" },
              { name: "vermelho" },
              { name: "preto" },
              { name: "amarelo" },
              { name: "azul" },
            ]}
            optionLabel="name"
            placeholder="Selecione as Cores"
            maxSelectedLabels={5}
            className="drop"
          />
          <MultiSelect
            value={newItem.tamanho}
            onChange={(e) => setNewItem({ ...newItem, tamanho: e.value })}
            options={[
              { name: "XS" },
              { name: "S" },
              { name: "M" },
              { name: "L" },
              { name: "XL" },
            ]}
            optionLabel="name"
            placeholder="Selecione os Tamanhos"
            maxSelectedLabels={5}
            className="drop"
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
                    <td>{parseFloat(item.preco).toFixed(2)}</td>
                    <td>{item.titulo}</td>
                    <td>
                    <button onClick={() => addPromo(item.id)}>
                        <img src={discount}/>
                      </button>
                      <button onClick={() => deleteItem(item.id)}>
                        <img src={deleteIcon}/>
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
