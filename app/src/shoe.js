import { Button, Card, Col, Row } from "react-bootstrap";
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
    <div className="container mt-4">
    <Header></Header>
    <Row>
        <Col>
        <Card>
    
        <div className="card text-center p-3">
          <img
            src={shoe.image}
            alt={shoe.brand}
            className="product-image"
            style={{ maxWidth: '300px' }}
          />
        </div>
   
        </Card>
        </Col>
        <Col>
        <Card>
        <div className="card-body">
            <h5 className="card-title">{shoe.brand}</h5>
            <h5 className="card-title">{shoe.model}</h5>
            <p className="card-text">${shoe.price} MXN</p>
            <p>Cantidad: {quantity}</p>
            <Button onClick={()=>{addMore()}}>+</Button>
            <Button onClick={()=>{addShoes()}}>Agregar al carrito</Button>
          </div>
        </Card>
        </Col>
    </Row>
    </div>
  );
}

export default Shoe;
