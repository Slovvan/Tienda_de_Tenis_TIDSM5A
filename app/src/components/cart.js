import React, { useEffect, useState } from "react";
import "./Shop.css";
import axios from "axios";
import { Button } from "react-bootstrap";

const Cart = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
  const user_id = user._id;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  });

  const deleteOne = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cart/delete/${id}`);
      getCart();
    } catch (error) {
      console.log("Error al borrar producto", error);
    }
  };

  const deleteAll = async () => {
    try {
      await axios.delete(`http://localhost:4000/cart/deleteAll/${user_id}`);
      getCart();
    } catch (error) {
      console.log("Error al borrar productos", error);
    }
  };

  const getCart = async () => {
    try {
      //obtener los id's de los productos en el carrito
      const res = await axios.post("http://localhost:4000/cart/showAll", {
        user_id: user_id,
      });
      const cart = res.data.cart;

      const shoes_Ids = cart.map((item) => item.product_id);

      if (shoes_Ids.length === 0) {
        setCart([]);
        return;
      }

      //buscar la informacion de los productos con su id
      const cart_items = await axios.post(
        "http://localhost:4000/product/show",
        { product_id: shoes_Ids }
      );

      //mapeo para añadir la propiedad quantity de la tabla cart a los productos
      const cartQuantity = cart.map((cartShoes) => {
        const product = cart_items.data.shoes.find(
          (shoe) => shoe._id === cartShoes.product_id
        );

        if (product) {
          product.quantity = cartShoes.quantity;
          product.carrito_id = cartShoes._id;
        }

        return product;
      });
      //guardar los productos en el useState
      setCart(cartQuantity);
    } catch (error) {
      console.log("Error al obtener productos", error);
    }
  };

  const total = cart
    ? cart.reduce(
        (acc, producto) => acc + producto.price * producto.quantity,
        0
      )
    : 0;  

  const purchaseShoes = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/product/buy`, {user_id: user_id});
      alert(res.data.message);
      getCart();
    } catch (error) {
      console.log("Error en la compra", error);
      alert("Error en la compra" )
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>

      {cart && cart.length > 0 ? (
        <>
          <ul className="list-group">
            {cart &&
              cart.map((shoe, i) => (
                <li key={i} className="list-group-item carrito-item">
                  <img
                    src={shoe.image}
                    alt={shoe.brand}
                    className="cart-image"
                  />
                  <strong>
                    {shoe.brand} {shoe.model}
                  </strong>{" "}
                  - ${shoe.price} MXN X {shoe.quantity}
                  <Button
                    onClick={() => deleteOne(shoe.carrito_id)}
                    className="btn btn-danger btn-sm"
                  >
                    ✖
                  </Button>
                </li>
              ))}
          </ul>

          <div className="cart-details">
            <h4>Total: ${total} MXN</h4>
            <Button className="btn btn-dark mt-2" onClick={() => purchaseShoes()}>
              Comprar
            </Button>
            <Button className="btn btn-dark mt-2" onClick={() => deleteAll()}>
              Vaciar
            </Button>
            <input
              type="text"
              placeholder="Código de cupón"
              className="form-control mt-2"
            />
            <Button className="btn btn-dark mt-2">Aplicar Cupón</Button>

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
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
