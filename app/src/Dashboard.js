import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Header from './components/header';
import ProductList from './components/ProductList';

export const Dashboard = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        getShoes();
    }, []);

    const getShoes = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/product/showAll");
            setShoes(data.shoes);
        } catch (error) {
            console.log("Error al obtener los tenis", error);
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="container-main">
                        <h1 className="text-center" style={{color: "red"}}>¡Bienvenido!</h1>
                        <p className='text-center' style={{color: "green"}}>¡Gracias por ser parte de Kingdom Shoes!</p>

                        <ProductList />
                    </div>
                </div>
            </main>

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
        </>
    );
};
