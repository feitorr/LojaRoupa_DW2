
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Filtragem from "../components/Filtragem/Filtragem";
import Cart from "../components/Cart/cart";
import Roupa_filtrada from "../components/Roupa_filtrada/Roupa_filtrada";

const Pagina_roupa = () => {
  return (
    <>
        <Header />
        <Cart />
        <div style={{ display: "flex", width:"100%"}} >
        <Filtragem />
        <div style={{ textAlign:"center", width:"100%" }}>
        <Roupa_filtrada/>
        </div>
        </div>
    </>
  );
};

export default Pagina_roupa;
