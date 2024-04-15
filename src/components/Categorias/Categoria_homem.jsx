
import chapeu from "./img_categorias/chapeu_homem.png"
import jeans from "./img_categorias/calças_homem.png";
import casao from "./img_categorias/casaco_homem.png";
import sweat from "./img_categorias/sweat_homem.png";
import tshirt from "./img_categorias/tshirt_homem.png";
import '../Categorias/Categoria_mulher.css';

const Categoria_homem = () => {
    return (<>
    <div className="titulo">
    <h1>CATEGORIA</h1>
    </div>
    <div className='container_cm'>
        <div className="categoria">
        <img src={tshirt}/>
        <p>T-SHIRTS</p>
        </div>
        <div className="categoria">
        <img src={sweat}/>
        <p>SWEATS</p>
        </div>
        <div className="categoria">
        <img src={casao}/>
        <p>CASACOS</p>
        </div>
        <div className="categoria">
        <img src={jeans}/>
        <p>CALÇAS</p>
        </div>
        <div className="categoria">
        <img src={chapeu}/>
        <p>CHAPÉUS</p>
        </div>
    </div>
        </>
      );
  };
  
  export default Categoria_homem;