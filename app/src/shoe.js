import { Button, Card, Col,Container, Row } from "react-bootstrap";
import Header from "./components/header";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";

function Shoe() {
    const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
    const user_id = user._id

    const location = useLocation();
    const { shoe } = location.state || {};

    const [quantity, setQuantity] = useState(shoe.quantity || 1);
    

    const addShoes = async() => {
        shoe.quantity = quantity
        shoe.product_id = shoe._id
        shoe.user_id = user_id
        
        try {
            //si existe actualizar la cantidad
            const res = await axios.post("http://localhost:4000/cart/showAll", {user_id: user_id})
            const cart = res.data.cart
            console.log("productos encontrados:", cart)
    
            const foundShoe = cart.find(item => item.product_id === shoe.product_id);
          
            if (foundShoe){
              await axios.put("http://localhost:4000/cart/update", shoe)
              return 
            }
              //si no añadirlo
              await axios.post("http://localhost:4000/cart/add", shoe)
            

        } catch (error) {
          console.log("Error al añadir los tenis", error)
        }
      }

      const addMore = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
      }
    
  return (
    <div>
    <Header></Header>
    <Row className="justify-content-center mt-5">
    <Col md="5" className="mb-4">
    <Card className="shadow-sm p-3 border-0 rounded-4 text-center"
            style={{
                background: "linear-gradient(135deg,rgb(171, 155, 70),rgb(226, 210, 126))",
                border: "2px solidrgb(252, 180, 0)",
                color: "#fff",
            }}>
            
            <div className="p-3">
                <img
                    src={shoe.image}
                    alt={shoe.brand}
                    className="product-image"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "280px",
                        objectFit: "contain",
                        borderRadius: "12px",
                        padding: "10px",
                        background: "#fff",
                        boxShadow: "0 4px 10px rgba(255, 215, 0, 0.5)"
                    }}
                />
            </div>
            </Card>
            </Col>
        <Col md="5" className="mb-4">
        <Card className="shadow-sm p-3 border-0 rounded-4 text-center"
            style={{
                background: "linear-gradient(135deg,rgb(171, 155, 70),rgb(226, 210, 126))",
                border: "2px solidrgb(252, 180, 0)",
                color: "#fff",
            }}>
            <div className="text-center mt-3">
                <h5 className="fw-bold text-dark" style={{ color: "gold" }}>{shoe.brand}</h5>
                <p style={{ fontSize: "1.2rem", opacity: "0.8" }}>{shoe.model}</p>
                <p className="fw-bold" style={{ fontSize: "1.3rem", color: "#FFD700" }}>
                    ${shoe.price}
                </p>
            </div>

            <div className="text-center mt-3">
                <button name="add" onClick={()=>{addShoes()}} variant="warning" className="btn btn-warning px-4 py-2 fw-bold rounded-pill">
                    Añadir al carrito 🛒
                </button>
            </div>

        </Card>
    </Col>
</Row>

 <footer style={{
                            background: "linear-gradient(135deg,rgb(120, 119, 114),rgb(232, 215, 132))",
                            border: "2px solidrgb(252, 180, 0)",
                            color: "#fff",
                        }}>
                <div className="container">
                    <a href="#" id="logo-white" style={{ fontSize: "1.8rem", fontWeight: "bold", color: "gold", textDecoration: "none" }}>
                        Kingdom Shoes 👟
                    </a>

                    <nav className="menu-nav-footer" style={{ margin: "15px 0" }}>
                        <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center", gap: "20px" }}>
                            <li>
                                <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "1rem", transition: "0.3s" }}>
                                    Fuentes
                                </a>
                            </li>
                            <li>
                                <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "1rem", transition: "0.3s" }}>
                                    Artículos
                                </a>
                            </li>
                            <li>
                                <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "1rem", transition: "0.3s" }}>
                                    Conoce +
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="social-icons" style={{ margin: "20px 0" }}>
                        <a href="#" style={{ margin: "0 10px", color: "white", fontSize: "1.5rem", transition: "0.3s" }}>
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" style={{ margin: "0 10px", color: "white", fontSize: "1.5rem", transition: "0.3s" }}>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" style={{ margin: "0 10px", color: "white", fontSize: "1.5rem", transition: "0.3s" }}>
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>

                    <p style={{ fontSize: "0.9rem", marginTop: "10px", opacity: "0.7" }}>
                        &copy; Kingdom Shoes 2025. We love you! 💙
                    </p>
                </div>
            </footer>
</div>




  );
}

export default Shoe;
