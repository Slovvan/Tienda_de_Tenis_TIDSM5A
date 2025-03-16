import { Navbar } from 'react-bootstrap';
import { useState } from 'react'; 


function Header({ onSearch }) {

  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Erick Sonsote atte: Ulises xdxdddxdxdxddxd
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); 
  };


  return (
    <>
      {user?.rol === "administrator" && (
        <Navbar>


          <div className="container mt-4 d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-success">Kingdom Shoes 👑</h2>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <button className="btn btn-dark" onClick={() => logout()}>Cerrar sesión</button>
            </Navbar.Collapse>
          </div>
        </Navbar>

      )
      }
      {user?.rol === "client" && (
      <header style={{
        background: "linear-gradient(135deg,rgb(120, 119, 114),rgb(232, 215, 132))",
        border: "2px solidrgb(252, 180, 0)",
        color: "#fff",
      }}>
        <div className="container">
          <div className="container-header">
            <a href="/dashboard" id="logo">Kingdom Shoes 👑</a>
            <nav className="menu-nav">
              <ul>
                <li>
                  <a href="/dashboard">Menu</a>
                </li>
                <li>
                  <a href="/dashboard">Mujeres</a>
                </li>
                <li>
                  <a href="/dashboard">Hombres</a>
                </li>
                <li>
                  <a href="/dashboard">Niños</a>
                </li>
                <li>
                  <a href="/dashboard">Deportes</a>
                </li>
                <li>
                  <a href="/shop">Carrito</a>
                </li>
              </ul>
            </nav>
            <div className="formulario">
              <form id="buscador-header" onSubmit={handleSearchSubmit}>
                <button type="submit">Search</button>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar productos..." />
              </form>
              <a className="btn btn-dark" href="/shop">Ver Carrito 🛒</a>
              <button className="btn" onClick={() => logout()}>🔒</button>

            </div>
          </div>
        </div>
      </header>
  )
}

    </>
  )
}

export default Header;