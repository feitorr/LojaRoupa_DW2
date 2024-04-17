import sais from "./img_categorias/saias_mulher.png";
import tops from "./img_categorias/tops_mulher.png";
import vestido from "./img_categorias/vestidos_mulher.png";
import chapeu from "./img_categorias/chapeu_mulher.png";
import jeans from  "./img_categorias/jeans_mulher.png";
import casao_mulher from "./img_categorias/casaco_mulher.png";
import sweat_mulher from "./img_categorias/sweat_mulher.png";
import tshirt_mulher from "./img_categorias/t_mulher.png";
import { Link } from "react-router-dom";
import './Categoria_mulher.css';

const Categoria_mulher = () => {
    return (<>
    <div className="titulo">
    <h1>CATEGORIA</h1>
    </div>
    <div className='container_cm'>
        <div className="categoria">
        <Link to="/roupa">
        <img src={tshirt_mulher}/>
        <p>T-SHIRTS</p>
        </Link>
        </div>
        <div className="categoria">
        <img src={sweat_mulher}/>
        <p>SWEATS</p>
        </div>
        <div className="categoria">
        <img src={casao_mulher}/>
        <p>CASACOS</p>
        </div>
        <div className="categoria">
        <img className ="jeans"src={jeans}/>
        <p>JEANS</p>
        </div>
        <div className="categoria">
        <img src={chapeu}/>
        <p>CHAPÉUS</p>
        </div>
        <div className="categoria">
        <img src={vestido}/>
        <p>VESTIDOS</p>
        </div>
        <div className="categoria">
        <img src={tops}/>
        <p>TOPS</p>
        </div>
        <div className="categoria">
        <img src={sais}/>
        <p>SAIAS</p>
        </div>
    </div>
        </>
      );
  };
  
  export default Categoria_mulher;