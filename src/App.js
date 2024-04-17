// Importando os componentes necessários
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NoPage from "./pages/NoPage";
import Page_homem from './pages/Page_homem';
import Page_mulher from './pages/Page_mulher';
import Product from "./pages/productinfo";
import Edit_profile from "./components/Edit_profile/Edit_profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>  
      <Route >
          <Route index element={<Home />} />
          <Route path="homem" element={<Page_homem />} /> 
         <Route path="mulher" element={<Page_mulher />} /> 
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
          <Route path="product" element={<Product />} />
          <Route path="edit" element={<Edit_profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
