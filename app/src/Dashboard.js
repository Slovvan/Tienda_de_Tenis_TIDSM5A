import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Header from './components/header';
import ProductList from './components/ProductList';
import Footer from './components/footer';

export const Dashboard = () => {
    const [shoes, setShoes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getShoes();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
      };

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
            <Header onSearch={handleSearch}/>
            <main>
                <div className="container">
                    <div className="container-main">
                        <h1 className="text-center" style={{color: "red"}}>¡Bienvenido!</h1>
                        <p className='text-center' style={{color: "green"}}>¡Gracias por ser parte de Kingdom Shoes!</p>

                        <ProductList searchTerm={searchTerm} />
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    );
};
