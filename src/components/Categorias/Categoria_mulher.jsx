import sais from "./img_categorias/pngwing.com (3).png";
import tops from "./img_categorias/tops_mulher.png";
import vestido from "./img_categorias/vestidos_mulher.png";
import chapeu from "./img_categorias/chapeu_mulher.png";
import jeans from "./img_categorias/jeans_mulher.png";
import casao_mulher from "./img_categorias/casaco_mulher.png";
import sweat_mulher from "./img_categorias/pngwing.com (4).png";
import tshirt_mulher from "./img_categorias/t_mulher.png";
import { Link } from "react-router-dom";
import './Categoria_mulher.css';

const Categoria_mulher = () => {
    return (<>
        <div className='containerr_cm'>
            <h1>CATEGORIAS</h1>
            <div className="flexx">
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"T-shirt"}?genero=${"Mulher"}`}>
                        <img src={tshirt_mulher} />
                        <p>T-Shirt</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Sweats"}?genero=${"Mulher"}`}>
                        <img src={sweat_mulher} />
                        <p>Sweats</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Casacos"}?genero=${"Mulher"}`}>
                        <img src={casao_mulher} />
                        <p>Jackets</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Jeans "}?genero=${"Mulher"}`}>
                        <img className="jeans" src={jeans} />
                        <p>Jeans</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Chapeus"}?genero=${"Mulher"}`}>
                        <img src={chapeu} />
                        <p>Hats</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Vestidos"}?genero=${"Mulher"}`}>
                        <img src={vestido} />
                        <p>Dresses</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Tops"}?genero=${"Mulher"}`}>
                        <img src={tops} />
                        <p>Tops</p>
                    </Link>
                </div>
                <div className="categoriaa">
                <Link  class="link"to={`/roupa?categoria=${"Saias"}?genero=${"Mulher"}`}>
                        <img src={sais} />
                        <p>Skirt</p>
                    </Link>
                </div>
            </div>
        </div>
    </>
    );
};

export default Categoria_mulher;