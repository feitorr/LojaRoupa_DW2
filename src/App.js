//import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Page_homem from './pages/Page_homem';
import Page_mulher from './pages/Page_mulher';

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route>
          <Route index element={<Home />} />
          <Route path="/Page_homem" component={Page_homem} />
          <Route path="/Page_mulher" component={Page_mulher} />
        </Route>
      </Routes>
    </BrowserRouter>
    /*<div className="App">
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
    </div>*/
  );
}

export default App;
