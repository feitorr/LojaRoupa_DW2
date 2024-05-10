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
            <div className="titulo">
                <h1>CATEGORIA</h1>
            </div>
            <div className='container_cm'>
                <div className="categoria">
                    <Link to={`/roupa?categoria=${"T-shirt"}`}>
                    <img src={tshirt} alt="T-SHIRTS" />
                    <p>T-SHIRTS</p>
                    </Link>
                </div>
                <div className="categoria">
                <Link to={`/roupa?categoria=${"Sweats"}`}>
                    <img src={sweat} alt="SWEATS" />
                    <p>SWEATS</p>
                    </Link> 
                </div>
                <div className="categoria">
                <Link to={`/roupa?categoria=${"Casacos"}`}>
                    <img src={casao} alt="Casacos" />
                    <p>CASACOS</p>
                    </Link>
                </div>
                <div className="categoria">
                <Link to={`/roupa?categoria=${"Calças"}`}>
                    <img src={jeans} alt="Calcas" />
                    <p>CALÇAS</p>
                    </Link>
                </div>
                <div className="categoria">
                <Link to={`/roupa?categoria=${"Chapeus"}`}>
                    <img src={chapeu} alt="Chapéus" />
                    <p>CHAPÉUS</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Categoria_homem;
