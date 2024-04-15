import React from 'react';
import './productinfo.css';
import delivery from './img/delivery.png';
import shop from './img/shop.png';

var tamanhosGlobal;
var corGlobal;

class ProductInfo extends React.Component {
    
    componentDidMount() {
        
        const elementosTamanho = document.querySelectorAll('.tamanho');

        elementosTamanho.forEach(elemento => {
            elemento.addEventListener('click', () => {
                this.funcTamanho(elemento.id);
            });
        });

        const elementosCores = document.querySelectorAll('.cor');

        elementosCores.forEach(elemento => {
            elemento.addEventListener('click', () => {
                this.funcCores(elemento.id);
            });
        });
    }

    funcCores = (id) => {
        const cores = ["preto", "vermelho", "azul", "branco", "preto", "amarelo"];
        
        cores.forEach(cor => {
            const elemento = document.getElementById(cor);
            
            if (cor === id) {
                elemento.classList.add("selectedCor");
                corGlobal = id;
            } else {
                elemento.classList.remove("selectedCor");
            }
            
        });
    }
    

    funcTamanho = (id) => {
        const tamanhos = ["XS", "S", "M", "L", "XL"];
        
        
        tamanhos.forEach(tamanho => {
            const elementos = document.getElementById(tamanho);
            if (tamanho === id) {
                elementos.classList.add("selected")
                tamanhosGlobal = id
            } else {
                elementos.classList.remove("selected")
            }
        });

    }
    addToBag = () => {
        if (tamanhosGlobal && corGlobal) {
            const item = { tamanho: tamanhosGlobal, cor: corGlobal, quantidade: 1 };
            const itemsNaBag = JSON.parse(sessionStorage.getItem('itemsNaBag')) || [];
            const itemExistenteIndex = itemsNaBag.findIndex(item => item.tamanho === tamanhosGlobal && item.cor === corGlobal);
            if (itemExistenteIndex !== -1) {
             
                itemsNaBag[itemExistenteIndex].quantidade++;
            } else {
       
                itemsNaBag.push(item);
            }
    
            sessionStorage.setItem('itemsNaBag', JSON.stringify(itemsNaBag));
            alert('Tamanho e cor adicionados à Bag!');
        } else {
            alert('Por favor, selecione um tamanho e uma cor antes de adicionar à Bag.');
        }
    }
    

    render() {
        return (
            <div class="product">
                <div className='productimg'>
                <img src='https://i.postimg.cc/2ShXTvgn/61059-08-001-5000x-png.webp'></img>
                </div>
            <div className="product-info">
                <h1>Casaco de algodão corta frio</h1>
                <p id="saldo">40.00€</p>
                <p id="preco">29.99€</p>
                <div className="conjunto">
                    <button className="tamanho" id="XS">
                        <h2>XS</h2>
                    </button>
                    <button className="tamanho" id="S">
                        <h2>S</h2>
                    </button>
                    <button className="tamanho" id="M">
                        <h2>M</h2>
                    </button>
                    <button className="tamanho" id="L">
                        <h2>L</h2>
                    </button>
                    <button className="tamanho" id="XL">
                        <h2>XL</h2>
                    </button>
                </div>
                <p><b>Guia de tamanhos</b>  Tamanho modelo L | Altura do modelo 184cm</p>
                <div className="cores">
                    <li className="cor preto" id="preto"></li>
                    <li className="cor vermelho" id="vermelho"></li>
                    <li className="cor branco" id="branco"></li>
                    <li className="cor azul" id="azul"> </li>
                    <li className="cor amarelo" id="amarelo"></li>
                </div>
                <div className="button">
                    <h3 onClick={this.addToBag}>adicionar ao carrinho</h3>
                </div>

                <div className="entregas">
                    <img src={shop}></img>
                    <div className="texto">
                        <p>Levantamento em loja</p>
                        <h3>GRÁTIS</h3>
                    </div>
                </div>
                <div className="entregas" style={{ marginTop: '-1px' }}>
                    <img src={delivery}></img>
                    <div className="texto">
                        <p>Entrega ao domicílio</p>
                        <h3>GRÁTIS</h3>
                    </div>
                </div>
                <p id="ref">REF 3214/321</p>
            </div>
            </div>
        );
    }
}

export default ProductInfo;
