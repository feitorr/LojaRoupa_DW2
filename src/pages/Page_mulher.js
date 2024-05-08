import Categoria_mulher from "../components/Categorias/Categoria_mulher";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import New_collection from "../components/New_collection/New_collection_homem";
import Cart from "../components/Cart/cart";
const Page_mulher = () => {
  return (
    <>
      <Header />
      <Cart />
      <Categoria_mulher />
      <New_collection />
      <Footer />
    </>
  );
};

export default Page_mulher;
