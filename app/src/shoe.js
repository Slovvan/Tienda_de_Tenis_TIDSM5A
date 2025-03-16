import { Button, Card, Col,Container, Row } from "react-bootstrap";
import Header from "./components/header";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import Footer from "./components/footer";

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

<Footer></Footer>
</div>




  );
}

export default Shoe;
