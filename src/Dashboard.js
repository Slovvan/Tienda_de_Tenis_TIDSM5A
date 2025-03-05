import React, { useEffect, useState} from 'react';
import './Dashboard.css';


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

    return (
    <>
      <header>
        <div className="container">
          <div className="container-header">
            <a href="#" id="logo">Kingdom Shoes</a>
            <nav className="menu-nav">
              <ul>
                <li>
                  <a href="#">Mujeres</a>
                </li>
                <li>
                  <a href="#">Hombres</a>
                </li>
                <li>
                  <a href="#">Niños</a>
                </li>
                <li>
                  <a href="#">Deportes</a>
                </li>
              </ul>
            </nav>
            <div className="formulario">
              <form id="buscador-header">
                <button type="submit">Search</button>
                <input type="search" />
              </form>
            </div>
          </div>
        </div>
      </header>
        <main>
            <div className="container">
            <div className="container-main">
                <h1>¡Bienvenido!</h1>
                <p>¡Gracias por ser parte de Kingdom Shoes!</p>
            </div>
            </div>
    </main>
    </>
    )};
