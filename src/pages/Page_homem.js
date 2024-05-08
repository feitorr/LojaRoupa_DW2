import Categoria_homem from "../components/Categorias/Categoria_homem";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import New_collection from "../components/New_collection/New_collection_homem";
import Cart from "../components/Cart/cart";
const Page_homem = () => {
  return (
    <>
      <Header />
      <Cart />
      <Categoria_homem />
      <New_collection />
    </>
  );
};

export default Page_homem;
