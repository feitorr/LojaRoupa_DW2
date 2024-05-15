import React from "react";
import "./productinfo.css";
import delivery from "./img/delivery.png";
import shop from "./img/shop.png";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);

var tamanhosGlobal;
var corGlobal;

class ProductInfo extends React.Component {
  state = {
    titulo: "",
    preco: "",
    imagem: "",
    tamanhos: ["XS", "S", "M", "L", "XL"],
    cores: ["preto", "vermelho", "azul", "branco", "amarelo"]
  };

  componentDidMount() {
    this.fetchData();

    const elementosTamanho = document.querySelectorAll(".tamanho");

    elementosTamanho.forEach((elemento) => {
      elemento.addEventListener("click", () => {
        this.funcTamanho(elemento.id);
      });
    });

    const elementosCores = document.querySelectorAll(".cor");

    elementosCores.forEach((elemento) => {
      elemento.addEventListener("click", () => {
        this.funcCores(elemento.id);
      });
    });
  }

  async fetchData() {
    try {
      
var url = window.location.href;
var regex = /[?&]id=(\d+)/i;
var match = regex.exec(url);

if(match){
  var productId = match[1];
}
      const { data, error } = await supabase
        .from("roupa")
        .select("titulo, preco,imagem, tamanho, cores")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Erro ao buscar dados:", error.message);
      } else {
        if (data) {
          this.setState({ titulo: data.titulo, preco: data.preco ,imagem: data.imagem});
          this.updateTamanhos(data.tamanho);
          this.updateCores(data.cores);
        } else {
          console.error("Nenhum dado encontrado.");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
    }
  }

  updateTamanhos = (tamanhoAPI) => {
    const tamanhosAtualizados = [...this.state.tamanhos];

    tamanhoAPI.split(",").forEach((tamanho) => {
      const index = tamanhosAtualizados.indexOf(tamanho.trim());
      if (index !== -1) {
        tamanhosAtualizados[index] = `${tamanho.trim()} show`;
      }
    });

    this.setState({ tamanhos: tamanhosAtualizados });
  };

  updateCores = (coresAPI) => {
    const coresAtualizadas = [...this.state.cores];

    coresAPI.split(",").forEach((cor) => {
      const index = coresAtualizadas.indexOf(cor.trim());
      if (index !== -1) {
        coresAtualizadas[index] = `${cor.trim()} colorShow`;
      }
    });

    this.setState({ cores: coresAtualizadas });
  };

  funcCores = (id) => {
    const cores = this.state.cores;
  
    cores.forEach((cor) => {
      const elemento = document.getElementById(cor.split(" ")[0]);
  
      if (cor.split(" ")[0] === id) {
        if (cor.includes("colorShow")) {
          elemento.classList.add("selectedCor");
          corGlobal = id;
        } else {
          elemento.classList.remove("selectedCor");
          corGlobal = null;
        }
      } else {
        elemento.classList.remove("selectedCor");
      }
    });
  };
  

  funcTamanho = (id) => {
    const tamanhos = this.state.tamanhos;

    tamanhos.forEach((tamanho) => {
      const elementos = document.getElementById(tamanho.split(" ")[0]);
      if (tamanho.split(" ")[0] === id) {
        if (tamanho.split(" ")[1] === "show") {
          elementos.classList.add("selected");
          tamanhosGlobal = id;
        }
      } else {
        elementos.classList.remove("selected");
      }
    });
  };

  addToBag = () => {
    if (tamanhosGlobal && corGlobal) {
      const item = {
        nome: this.state.titulo,
        image: this.state.imagem,
        price: this.state.preco,
        saldo: this.state.preco,
        tamanho: tamanhosGlobal,
        cor: corGlobal,
        quantidade: 1,
      };
      const itemsNaBag = JSON.parse(sessionStorage.getItem("itemsNaBag")) || [];
      const itemExistenteIndex = itemsNaBag.findIndex(
        (item) => item.tamanho === tamanhosGlobal && item.cor === corGlobal
      );
      if (itemExistenteIndex !== -1) {
        itemsNaBag[itemExistenteIndex].quantidade++;
      } else {
        itemsNaBag.push(item);
      }

      sessionStorage.setItem("itemsNaBag", JSON.stringify(itemsNaBag));
      alert("Tamanho e cor adicionados à Bag!");
    } else {
      alert(
        "Por favor, selecione um tamanho e uma cor antes de adicionar à Bag."
      );
    }
  };

  render() {
    const { tamanhos, cores } = this.state;

    return (
      <div className="product">
        <div className="productimg">
          <img
            src={`https://lelwhxghwolrpmrkeeuw.supabase.co/storage/v1/object/public/imagens/${this.state.imagem}`}
            alt="Imagem do produto"
          ></img>
        </div>
        <div className="product-info">
          <h1>{this.state.titulo}</h1>
          <p id="saldo">80.00€</p>
          <p id="preco">{this.state.preco}€</p>
          <div className="conjunto">
            {tamanhos.map((tamanho, index) => (
              <button
                className={`tamanho ${tamanho.includes("show") ? "show" : ""}`}
                id={tamanho.split(" ")[0]}
                key={index}
                style={{
                  cursor: tamanho.includes("show") ? "pointer" : "not-allowed",
                }}
                onClick={
                  tamanho.includes("show")
                    ? () => this.funcTamanho(tamanho.split(" ")[0])
                    : null
                }
              >
                <h2>{tamanho.split(" ")[0]}</h2>
              </button>
            ))}
          </div>
          <p>
            <b>Guia de tamanhos</b> Tamanho modelo L | Altura do modelo 184cm
          </p>
          <div className="cores">
            {cores.map((cor, index) => (
              <li
                className={`cor ${cor.split(" ")[0]} ${cor.includes("colorShow") ? "colorShow" : ""}`}
                id={cor.split(" ")[0]}
                key={index}
                style={{
                  cursor: cor.includes("colorShow") ? "pointer" : "not-allowed",
                }}
                onClick={
                  cor.includes("colorShow")
                    ? () => this.funcCores(cor.split(" ")[0])
                    : null
                }
              ></li>
            ))}
          </div>
          <div className="button">
            <h3 onClick={this.addToBag}>adicionar ao carrinho</h3>
          </div>

          <div className="entregas">
            <img src={shop} alt="Icone de loja"></img>
            <div className="texto">
              <p>Levantamento em loja</p>
              <h3>GRÁTIS</h3>
            </div>
          </div>
          <div className="entregas" style={{ marginTop: "-1px" }}>
            <img src={delivery} alt="Icone de entrega"></img>
            <div className="texto">
              <p>Entrega ao domicílio</p>
              <h3>GRÁTIS</h3>
            </div>
          </div>
          <p id="ref">REF 3214/321</p>
        </div>
      </div>
    );
  }
}

export default ProductInfo;
