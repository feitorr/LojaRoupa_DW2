import chapeu from "../Categorias/img_categorias/chapeu_homem.png";
import jeans from "../Categorias/img_categorias/calças_homem.png";
import casao from "../Categorias/img_categorias/casaco_homem.png";
import sweat from "../Categorias/img_categorias/sweat_homem.png";
import tshirt from "../Categorias/img_categorias/tshirt_homem.png";
import { Link } from "react-router-dom";
import '../Categorias/Categoria.css';

const Categoria_homem = () => {
    return (
        <>
            <div className='container_cm'>
                <h1>CATEGORIAS</h1>
                <div className="flex">
                <div className="categoria">
                    <Link  class="link"to={`/roupa?categoria=${"T-shirt"}`}>
                    <img src={tshirt} alt="T-SHIRTS" />
                    <p>T-Shirt</p>
                    </Link>
                </div>
                <div className="categoria">
                <Link class="link" to={`/roupa?categoria=${"Sweats"}`}>
                    <img src={sweat} alt="SWEATS" />
                    <p>Sweats</p>
                    </Link> 
                </div>
                <div className="categoria">
                <Link  class="link" to={`/roupa?categoria=${"Casacos"}`}>
                    <img src={casao} alt="Casacos" />
                    <p>Jackets</p>
                    </Link>
                </div>
                <div className="categoria">
                <Link  class="link" to={`/roupa?categoria=${"Jeans"}`}>
                    <img src={jeans} alt="Calcas" />
                    <p>Jeans</p>
                    </Link>
                </div>
                <div className="categoria">
                <Link  class="link" to={`/roupa?categoria=${"Chapeus"}`}>
                    <img src={chapeu} alt="Chapéus" />
                    <p>Hat</p>
                    
                    </Link>
                </div>
                </div>
            </div>
        </>
    );
};

export default Categoria_homem;
