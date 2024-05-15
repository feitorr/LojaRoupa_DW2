import imagem from "./img/logo2.png";
import admin_logo from "./img/admin_logo.png";
import "./Sidebar_admin.css";
import { Link } from "react-router-dom";
const Sidebar_admin = () => {
  return (
    <>
      <div className="container_admin">
        <Link to="/admin">
          <img src={imagem} alt="Rizzland" />
        </Link>
        <div className="circulo">
          <img src={admin_logo} alt="Rizzland" />
        </div>
        <h3 className="nome_side_bar">ADMIN</h3>
        <div className="btn">
          <div className="botoes">
            <Link to="/edit">
              <button>Perfil</button>
            </Link>
          </div>
          <div className="botoes">
          <Link to="/stock">
              <button>Stock</button>
            </Link>
          </div>
          <div className="botoes">
            <button>Adicionar Stock</button>
          </div>
          <div className="botoes">
            <button>Promoções</button>
          </div>
          <div className="botoes">
            <button>Vendidos</button>
          </div>
          <div className="botoes">
            <button>Clientes</button>
          </div>
        </div>
         <div className="icon_side">
          </div>
      </div>    
    </>
  );
};

export default Sidebar_admin;
