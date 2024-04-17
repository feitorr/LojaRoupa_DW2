import tshirt from "../Categorias/img_categorias/sweat_homem.png";
import "../New_collection/New_collection.css"
const New_collection_homem = () => {
    return (
        <>
            <div className="container_nc">
                <h1>NEW COLLECTION</h1>
                <div className="collection">
                    <div className="card">
                    <img src={tshirt}/>
                    <p className="category">Sweats/Homem</p>
                    <p className="brand">Nude Project</p>
                    <p className="price">60,00€</p>
                    </div>
                    <div className="card">
                    <img src={tshirt}/>
                    <p className="category">Sweats/Homem</p>
                    <p className="brand">Nude Project</p>
                    <p className="price">60,00€</p>
                    </div>
                    <div className="card">
                    <img src={tshirt}/>
                    <p className="category">Sweats/Homem</p>
                    <p className="brand">Nude Project</p>
                    <p className="price">60,00€</p>
                    </div>
                    <div className="card">
                    <img src={tshirt}/>
                    <p className="category">Sweats/Homem</p>
                    <p className="brand">Nude Project</p>
                    <p className="price">60,00€</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default New_collection_homem;
