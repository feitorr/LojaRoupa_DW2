// Importando os componentes necessários
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import './App.css';
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NoPage from "./pages/NoPage";
import Page_homem from './pages/Page_homem';
import Page_mulher from './pages/Page_mulher';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Product from "./pages/productinfo";
import Pagina_roupa from "./pages/Pagina_roupa";
import Edit_profile from "./components/Edit_profile/Edit_profile";
import { createClient } from "@supabase/supabase-js";

const supabaeurl = 'https://lelwhxghwolrpmrkeeuw.supabase.co';
const supabasekey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI';
const supabase = createClient(supabaeurl, supabasekey);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="homem" element={<Page_homem />} />
          <Route path="mulher" element={<Page_mulher />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
          <Route path="product" element={<Product />} />
          <Route path="roupa" element={<Pagina_roupa />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="edit" element={<Edit_profile />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
