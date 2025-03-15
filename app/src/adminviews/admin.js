import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Carousel,
  Spinner,
  Navbar,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

function Admin() {
  const [metrics, setMetrics] = useState({ numberUsers: 0, numberShoes: 0 });
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form para crear un tenis
  const [formData, setFormData] = useState({
    image: "",
    brand: "",
    model: "",
    price: "",
    stock: "",
    color: "",
  });

  useEffect(() => {
    getShoes();
    getMetrics();
  }, []);

  const getShoes = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/product/showAll");
      setShoes(data.shoes);
      setLoading(false);
    } catch (error) {
      setError("Error al obtener los tenis, intenta más tarde.");
      setLoading(false);
    }
  };

  const getMetrics = async () => {
    try {
      const res = await axios.get("http://localhost:4000/metrics");
      setMetrics({
        numberUsers: res.data.numberUsers,
        numberShoes: res.data.numberShoes,
      });
    } catch (error) {
      setError("Hubo un error al obtener las métricas.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateShoe = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/product/add", formData);
      alert("Producto agregado con éxito");
      setFormData({
        image: "",
        brand: "",
        model: "",
        price: "",
        stock: "",
        color: "",
      });
      getShoes();
      getMetrics();
    } catch (error) {
      alert("Error al crear el producto");
      console.error(error);
    }
  };

  const handleDeleteShoe = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/delete/${id}`);
      alert("Producto eliminado con éxito");
      getShoes();
      getMetrics();
    } catch (error) {
      alert("Error al eliminar el producto");
      console.error(error);
    }
  };

  const groupedProducts = [];
  for (let i = 0; i < shoes.length; i += 3) {
    groupedProducts.push(shoes.slice(i, i + 3));
  }

  return (
    <Container className="admin-container">
      <Navbar className="admin-navbar">
        <div className="navbar-content">
          <h2 className="logo-title">Kingdom Shoes 👑</h2>
          <Button variant="dark" className="logout-btn">
            Cerrar sesión
          </Button>
        </div>
      </Navbar>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="metrics-row">
        <Col>
          <Card className="metrics-card">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>{metrics.numberUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="metrics-card">
            <Card.Body>
              <Card.Title>Tenis</Card.Title>
              <Card.Text>{metrics.numberShoes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="create-product-row">
        <Col>
          <Card className="form-card">
            <Card.Body>
              <Card.Title>Agregar nuevo tenis</Card.Title>
              <Form onSubmit={handleCreateShoe}>
                <Form.Group>
                  <Form.Label>Imagen (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button type="submit" className="btn-gold mt-3">
                  Agregar tenis
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="products-row">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="warning" />
            <p>Cargando...</p>
          </div>
        ) : (
          <Card className="products-carousel-card">
            <Carousel>
              {groupedProducts.map((shoesGroup, i) => (
                <Carousel.Item key={i}>
                  <div className="product-group">
                    {shoesGroup.map((shoe) => (
                      <div key={shoe._id} className="product-card">
                        <div className="card text-center">
                          <img
                            src={shoe.image}
                            alt={shoe.model}
                            className="product-image"
                          />
                          <div className="card-body">
                            <h5>{shoe.brand}</h5>
                            <h6>{shoe.model}</h6>
                            <p className="price">${shoe.price} MXN</p>
                            <p className="stock">Stock: {shoe.stock}</p>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteShoe(shoe._id)}
                              className="btn-delete"
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Card>
        )}
      </Row>
    </Container>
  );
}

export default Admin;
