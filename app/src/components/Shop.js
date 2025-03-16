import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./cart";
import "./Shop.css";
import { Col, Row, Carousel } from "react-bootstrap";
import Header from "./header";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header onSearch={handleSearch}></Header>
      <div className="container mt-3">
        <Row className="g-4">
          <Col className="d-flex justify-content-center align-items-center">
            <Carousel className="w-70">
              {" "}
              {/* Ajustar el tamaño del carousel */}
              <Carousel.Item>
                <img
                  src="https://th.bing.com/th/id/OIP.kvwyKncrn8Ms5fVV5RUo6gHaLW?rs=1&pid=ImgDetMain"
                  alt="add"
                  className="d-block w-100"
                  style={{ maxHeight: "700px", objectFit: "contain" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/de101c28667711.55cbbb3fdc5d2.jpg"
                  alt="add"
                  className="d-block w-100"
                  style={{ maxHeight: "700px", objectFit: "contain" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://img.freepik.com/premium-psd/sport-shoes-sale-social-media-instagram-post-square-banner-template-design_70055-1549.jpg?w=740"
                  alt="add"
                  className="d-block w-100"
                  style={{ maxHeight: "700px", objectFit: "contain" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://th.bing.com/th/id/OIP.0IljiYGHdZfVG0MZUuVVcgHaNK?w=1125&h=2000&rs=1&pid=ImgDetMain"
                  alt="add"
                  className="d-block w-100"
                  style={{ maxHeight: "700px", objectFit: "contain" }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col>
            <Cart />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Shop;
