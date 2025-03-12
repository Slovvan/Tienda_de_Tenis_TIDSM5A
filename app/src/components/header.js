import { Navbar } from 'react-bootstrap';

function Header(){

  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;
    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }
    
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
 
          <header>
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
              <form id="buscador-header">
                <button type="submit">Search</button>
                <input type="search" />
              </form>
              <a className="btn btn-dark"href="/shop">Ver Carrito 🛒</a>
              <button className="btn" onClick={() => logout()}>🔒</button>
              
            </div>
          </div>
        </div>
        </header>
        
    
        </>
    )
}

export default Header;