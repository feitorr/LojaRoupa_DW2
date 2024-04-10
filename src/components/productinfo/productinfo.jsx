import React from 'react';
import './productinfo.css';
import delivery from './img/delivery.png';
import shop from './img/shop.png';

class ProductInfo extends React.Component {
    render() {
        return (
            <div className="product-info">
                <h1>Casaco de algodão corta frio</h1>
                <p id="saldo">40.00€</p>
                <p id="preco">29.99€</p>
                <div className="conjunto">
                    <button className="tamanho">
                        <h2>XS</h2>
                    </button>
                    <button className="tamanho">
                        <h2>S</h2>
                    </button>
                    <button className="tamanho">
                        <h2>M</h2>
                    </button>
                    <button className="tamanho">
                        <h2>L</h2>
                    </button>
                    <button className="tamanho">
                        <h2>XS</h2>
                    </button>
                </div>
                <p><b>Guia de tamanhos</b>  Tamanho modelo L | Altura do modelo 184cm</p>
                <div class="cores">
                    <li class="cor preto"></li>
                    <li class="cor vermelho"></li>
                    <li class="cor branco"></li>
                    <li class="cor azul"></li>
                    <li class="cor amarelo"></li>
                </div>
                <div class="button">
                    <h3>adicionar ao carrinho</h3>
                </div>

                <div class="entregas">
                <img src={shop}></img>
                    <div class="texto">
                        <p>Levantamento em loja</p>
                        <h3>GRÁTIS</h3>
                    </div>
                </div>
                <div class="entregas"  style={{ marginTop: '-1px' }}>
                    <img src={delivery}></img>
                    <div class="texto">
                        <p>Entrega ao domicílio</p>
                        <h3>GRÁTIS</h3>
                    </div>
                </div>
                <p id="ref">REF 3214/321</p>
            </div>

        );
    }
}

export default ProductInfo;

