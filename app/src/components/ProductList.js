import React from "react";
import "./Shop.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductList = ({ searchTerm }) => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getShoes();
  }, []);

  useEffect(() => {
    filters();
  }, [selectedColor, selectedBrand, searchTerm]);

  const getShoes = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/product/showAll");
      setShoes(data.shoes);
      setFilteredShoes(data.shoes);
    } catch (error) {
      console.log("Error al obtener los tenis", error);
    }
  };

  const addShoes = async (shoes_id, quantity) => {
    const user_id = user._id;
    const shoe = {
      user_id: user_id,
      product_id: shoes_id,
      quantity: 1,
    };
    try {
      const res = await axios.post("http://localhost:4000/cart/showAll", {
        user_id: user_id,
      });
      const cart = res.data.cart;
      console.log("productos encontrados:", cart);

      const foundShoe = cart.find(
        (item) => item.product_id === shoe.product_id
      );

      if (foundShoe) {
        await axios.put("http://localhost:4000/cart/update", shoe);
        return;
      }

      await axios.post("http://localhost:4000/cart/add", shoe);
    } catch (error) {
      console.log("Error al añadir los tenis", error);
    }
  };

  const filters = () => {
    let filtered = shoes.filter((shoe) => {
      return (
        (selectedColor === "" || shoe.color === selectedColor) &&
        (selectedBrand === "" || shoe.brand === selectedBrand) &&
        (shoe.model.toLowerCase().includes(searchTerm.toLowerCase()) || shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredShoes(filtered);
  };

  const viewShoe = (shoe) => {
    navigate("/shoe", { state: { shoe } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Nuestra Colección</h2>
      <div className="filters mb-4 d-flex gap-2">
        <select
          onChange={(e) => setSelectedColor(e.target.value)}
          className="form-select"
        >
          <option value="">Todos los colores</option>
          <option value="White">blanco</option>
          <option value="gray">gris</option>
          <option value="black">Negro</option>
        </select>

        <select
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="form-select"
        >
          <option value="">Todas las marcas</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
        </select>
      </div>

      <div className="row">
        {filteredShoes.map((shoe) => (
          <div key={shoe._id} className="col-md-4">
            <div className="card text-center p-3">
              <button
                className="product-link"
                onClick={() => viewShoe(shoe)} // Llamamos a handleNavigate con el objeto
              >
                <img
                  src={shoe.image}
                  alt={shoe.brand}
                  className="product-image"
                />
              </button>
              <div className="card-body">
                <h5 className="card-title">{shoe.brand}</h5>
                <h5 className="card-title">{shoe.model}</h5>
                <p className="card-text">${shoe.price} MXN</p>
                <button
                  className="btn btn-warning"
                  onClick={() => addShoes(shoe._id)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
