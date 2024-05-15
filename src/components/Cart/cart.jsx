import React from "react";
import "./cart.css";

const Cart = () => {

    function closeCart() {
        var cart = document.getElementById('popupCart');
        cart.classList.remove('showw');
    }
    
    return (
        <>
            <div className="cart" id="popupCart">
                <div className="popup-cart">
                    <span className="close-btn" onClick={closeCart}>X</span>
                    <h1>Carrinho</h1>
                    <div id="cart-content">
                    
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
