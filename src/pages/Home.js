import React, { cloneElement } from "react";
import imagem from "../img/logo.png";
import imagem_mulher from "../img/mulher.png";
import imagem_homem from "../img/homem.png";
import '../css/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (<>
    <div className="logo">
      <img src={imagem} alt="Rizzland"/>
    </div>
      <div className="container">
      <Link className="link" to="/mulher">
    <div className="mulher">
      <img className="imagem_mulher" src={imagem_mulher}/>
      <h1 className="tipo">Mulher</h1>
    </div>
    </Link>
    <div className="homem">
  <Link className="link" to="/Page_homem">
    <img className="imagem_homem" src={imagem_homem} alt="Homem" />
    <h1 className="tipo">Homem</h1>
  </Link>
</div>

      </div>
      <footer>
        <p>@copy right RIZZLAND SFJG</p>
      </footer>
    </>
  );
};

export default Home;
