import React, { useEffect, useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Header from './components/header';
import ProductList from './components/ProductList';

export const Dashboard = () => {
/* 
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser()
    }, []);

    const getUser = () => {
        const user = JSON.parse(localStorage.user);
        setUser(user);
    } */

    const [shoes, setShoes] = useState([])
    
    useEffect(()=>{
        getShoes()
    }, [])
    
    const getShoes = async() => {
        try {
            const {data} = await axios.get("http://localhost:4000/product/showAll")
            setShoes(data.shoes)
            
        } catch (error) {
            console.log("Error al obtener los tenis", error)
        }
    }

    return (
    <>
      <Header></Header>
        <main>
            <div className="container">
            <div className="container-main">
                <h1>¡Bienvenido!</h1>
                <p>¡Gracias por ser parte de Kingdom Shoes!</p>

                <ProductList></ProductList>
            </div>
            </div>
    </main>
    </>
    )};