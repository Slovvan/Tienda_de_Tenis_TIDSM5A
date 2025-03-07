import React from "react";
import "./Shop.css";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 1500,
    image: "https://cdn.themedizine.com/2019/02/1-7-e1551050778360.jpg",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 2200,
    image:
      "https://sneakernews.com/wp-content/uploads/2018/10/undftd-adidas-running-collection-1.jpg",
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 1800,
    image:
      "https://th.bing.com/th/id/OIP.X0c-tt7cKgk4fdcudTqZ7wAAAA?rs=1&pid=ImgDetMain",
  },
];

const ProductList = ({ agregarAlCarrito }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Nuestra Colección</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card text-center p-3">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price} MXN</p>
                <button
                  className="btn btn-warning"
                  onClick={() => agregarAlCarrito(product)}
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
