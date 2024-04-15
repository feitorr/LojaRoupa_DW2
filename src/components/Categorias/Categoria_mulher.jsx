import sais from "../Categorias/img_categorias/saias_mulher.png";
import tops from "../Categorias/img_categorias/tops_mulher.png";
import vestido from "../Categorias/img_categorias/vestidos_mulher.png";
import chapeu from "../Categorias/img_categorias/chapeu_mulher.png";
import jeans from "../Categorias/img_categorias/jeans_mulher.png";
import casao_mulher from"../Categorias/img_categorias/casaco_mulher.png";
import sweat_mulher from "../Categorias/img_categorias/sweat_mulher.png";
import tshirt_mulher from "../Categorias/img_categorias/t_mulher.png";
import '../Categorias/Categoria.css';
const Categoria_mulher = () => {
    return (<>
    <div className="titulo">
    <h1>CATEGORIA</h1>
    </div>
    <div className='container_cm'>
        <div className="categoria">
        <img src={tshirt_mulher}/>
        <p>T-SHIRTS</p>
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