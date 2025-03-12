import "./styles/stylesLogin.css"

function Login(){
    return (
    <div>
            <div class="container">
        <div class="form-container" id="login">
            <h2>Iniciar Sesión</h2>
            <form>
                <label for="email-login">Correo:</label>
                <input type="email" id="email-login" required/>
                
                <label for="password-login">Contraseña:</label>
                <input type="password" id="password-login" required/>

                <button type="submit">Entrar</button>
            </form>
            <p>¿No tienes cuenta? <a href="#" onclick="mostrarRegistro()">Regístrate</a></p>
        </div>
        <div class="form-container oculto" id="register">
            <h2>Registrarse</h2>
            <form>
                <label for="name">Nombre:</label>
                <input type="text" id="name" required />

                <label for="email-register">Correo:</label>
                <input type="email" id="email-register" required/>
                
                <label for="password-register">Contraseña:</label>
                <input type="password" id="password-register" required/>

                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes cuenta? <a href="#" onclick="mostrarLogin()">Inicia sesión</a></p>
        </div>
    </div>
        </div>
        
    
    )
}


export default Login;