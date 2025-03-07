import React from "react";
import "./Shop.css";

const Cart = ({ cart = [], removeFromCart }) => {
  const total = cart
    ? cart.reduce((acc, producto) => acc + producto.price, 0)
    : 0;
  console.log("Contenido del carrito en Cart.js:", cart);
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <ul className="list-group">
        {cart &&
          cart.map((producto, index) => (
            <li key={index} className="list-group-item carrito-item">
              <img
                src={producto.image}
                alt={producto.name}
                className="cart-image"
              />
              <strong>{producto.name}</strong> - ${producto.price} MXN
              <button
                onClick={() => removeFromCart(index)}
                className="btn btn-danger btn-sm"
              >
                ✖
              </button>
            </li>
          ))}
      </ul>

      <div className="cart-details">
        <h4>Total: ${total} MXN</h4>
        <input
          type="text"
          placeholder="Código de cupón"
          className="form-control mt-2"
        />
        <button className="btn btn-dark mt-2">Aplicar Cupón</button>

        <h5 className="mt-3">Métodos de Pago</h5>
        <div className="payment-methods">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
            alt="MasterCard"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
