import React from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import "./Header.css";
import "../Cart/cart.css";
import { createClient } from "@supabase/supabase-js";
import FinalizarCompra from "../FinalizarCompra/finalizar";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);

const Header = ({ onFinalizarCompra }) => {
  function carrinho() {
    var cart = document.getElementById("popupCart");
    cart.classList.toggle("showw");

    const sessionStorageData = JSON.parse(sessionStorage.getItem("itemsNaBag"));

    if (!sessionStorageData || sessionStorageData.length === 0) {
      document.getElementById("cart-content").innerHTML =
        "<p>Nada no carrinho</p>";
    } else {
      const items = sessionStorageData.map(
        (item, index) => `
        <div key=${index}>
            <div class="cartbags">
                <div class="bagimg">
                    <img src=https://lelwhxghwolrpmrkeeuw.supabase.co/storage/v1/object/public/imagens/${item.image} alt="Roupa" />
                </div>
                <div class="content">
                    <h2>${item.nome}</h2>
                    <p class="price">${item.price}€</p>
                    <p class="bagtamanho">${item.tamanho}</p>
                    <div class="corbag">
                        <p>${item.cor}</p>
                        <p>- ${item.quantidade} +</p>
                    </div>
                </div>
            </div>
        </div>
      `
      );

      document.getElementById("cart-content").innerHTML = `
        ${items.join("")}
        <button class="finalizar" id="finalizarButton">Finalizar Compra</button>
      `;

      document.getElementById("finalizarButton").addEventListener("click", () => {
        const tamanhoMap = sessionStorageData.reduce((acc, item) => {
          if (!acc[item.id]) {
            acc[item.id] = [];
          }
          acc[item.id].push(item.tamanho);
          return acc;
        }, {});

        Object.entries(tamanhoMap).forEach(([id, tamanhos]) => {
          FinalizarCompra(id, tamanhos);
        });
      });
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-title">
          <Link className="link" to="/">
            <span className="header-rizz">RIZZ</span>
            <span className="header-land">LAND</span>
          </Link>
        </div>
        <div className="header-buttons">
          <IconButton
            onClick={carrinho}
            color="inherit"
            className="header-button"
          >
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
          <IconButton color="inherit" className="header-button">
            <Link to="/login">
              <PersonIcon />
            </Link>
          </IconButton>
        </div>
      </header>
      <div className="headerDivisiveLine"></div>
    </>
  );
};

export default Header;
