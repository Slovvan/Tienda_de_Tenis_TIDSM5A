import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./cart";
import "./Shop.css";

const Shop = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
  };

  console.log("Carrito actualizado:", carrito);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="titulo">Kingdom Shoes 👑</h2>
        <button
          className="btn btn-dark"
          onClick={() => setMostrarCarrito(true)}
        >
          Ver Carrito 🛒 ({carrito.length})
        </button>
      </div>

      <ProductList agregarAlCarrito={agregarAlCarrito} />

      {mostrarCarrito && (
        <Cart
          cart={carrito}
          removeFromCart={eliminarDelCarrito}
          cerrarCarrito={() => setMostrarCarrito(false)}
        />
      )}
    </div>
  );
};

export default Shop;
