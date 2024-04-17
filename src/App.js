//import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Product from "./pages/productinfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <LoginPage /> */}
      {/* <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
      Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
      >
      Learn React
      </a>
      </header>
    </div> */}
    </>
  );
}

export default App;
