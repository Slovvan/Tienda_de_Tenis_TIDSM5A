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
  import Header from "../components/header";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import "./admin.css";
  
  function Admin() {
    const [metrics, setMetrics] = useState({
      numberUsers: 0,
      numberShoes: 0,
    });
  
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
        const data = {
          numberUsers: res.data.numberUsers,
          numberShoes: res.data.numberShoes,
        };
        setMetrics(data);
      } catch (error) {
        setError("Hubo un error al obtener las métricas.");
      }
    };
  
    const groupedProducts = [];
    for (let i = 0; i < shoes.length; i += 3) {
      groupedProducts.push(shoes.slice(i, i + 3));
    }
  
    return (
      <Container className="admin-container">
        <Navbar>
          <div className="container mt-4 d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-success">Kingdom Shoes 👑</h2>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <button className="btn btn-dark">Cerrar sesión</button>
            </Navbar.Collapse>
          </div>
        </Navbar>
        {error && <div className="alert alert-danger">{error}</div>}
        <Row>
          <Col>
            <Card className="metrics-card">
              <Card.Title className="metrics-title">Usuarios</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {metrics.numberUsers}
              </Card.Subtitle>
              <Card.Title className="metrics-title">Tenis</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {metrics.numberShoes}
              </Card.Subtitle>
            </Card>
          </Col>
          <Col>
            <Card className="search-card">
              <Form>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Buscar..."
                      className="search-input"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" className="search-button">
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Cargando...</p>
            </div>
          ) : (
            <Card className="products-carousel-card">
              <Carousel>
                {groupedProducts.map((shoes, i) => (
                  <Carousel.Item key={i}>
                    <div className="product-group">
                      {shoes.map((shoe) => (
                        <div key={shoe.id} className="product-card">
                          <div className="card text-center">
                            <img
                              src={shoe.image}
                              alt={shoe.name}
                              className="product-image"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{shoe.brand}</h5>
                              <h6 className="card-title">{shoe.model}</h6>
                              <p className="card-text price">${shoe.price} MXN</p>
                              <p className="card-text stock">
                                Stock: {shoe.stock}
                              </p>
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
  
  export default Admin;