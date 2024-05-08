import React from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import "./Header.css";
import "../Cart/cart.css";

const Header = () => {
  function carrinho() {
    var cart = document.getElementById("popupCart");
    cart.classList.toggle("show");

    const sessionStorageData = JSON.parse(sessionStorage.getItem("itemsNaBag"));

    if (!sessionStorageData || sessionStorageData.length === 0) {
      document.getElementById("cart-content").innerHTML =
        "<p>Nada no carrinho</p>";
      return;
    }

    const items = sessionStorageData.map(
      (item, index) =>
        `<div key=${index}>
            <div class="cartbags">
                <div class="bagimg">
                    <img src=${item.image}></img>
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
        </div>`
    );

    document.getElementById("cart-content").innerHTML = items.join("");
  }

  return (
    <>
      <header className="header">
        <div className="header-title">
          <span className="header-rizz">RIZZ</span>
          <span className="header-land">LAND</span>
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
