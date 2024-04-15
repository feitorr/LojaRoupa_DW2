import imagem from "../Sidebar_admin/img/logo2.png";
import admin_logo from "../Sidebar_admin/img/admin_logo.png";
import '../Sidebar_admin/Sidebar_admin.css';
const Sidebar_admin = () => {
    return (<>
    <div className="container_admin">
    <img src={imagem} alt="Rizzland"/>
    <div className="circulo">
    <img src={admin_logo} alt="Rizzland"/>
    </div>
    <div className="btn">
    <div className="botoes">
        <button>Perfil</button>
    </div>
    <div className="botoes">
        <button>Stock</button>
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
    </div>
        </>
      );
  };
  
  export default Sidebar_admin;