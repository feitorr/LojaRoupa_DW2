// Importando os componentes necessários
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Product from "./pages/productinfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
