
import chapeu from "../img/chapeu_homem.png"
import jeans from "../img/calças_homem.png";
import casao from "../img/casaco_homem.png";
import sweat from "../img/sweat_homem.png";
import tshirt from "../img/tshirt_homem.png";
import '../css/Categoria_mulher.css';
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