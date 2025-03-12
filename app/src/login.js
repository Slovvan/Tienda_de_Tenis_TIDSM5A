import { useState } from "react";
import "./styles/stylesLogin.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Button } from "react-bootstrap";


function Login(){
    const [data, setData] = useState({})
    const navigate = useNavigate();

    const onChangeLogin= (e)=>{
        e.preventDefault()
        const nData = data
        nData[e.target.name] = e.target.value
        setData(nData)
        console.log(nData)
    }

    const onSubmit = async ()=>{
        try {
            const res = await axios.post("http://localhost:4000/users/login", data)
            console.log("Inicio de sesion exitoso")

            const user = res.data.user
            localStorage.user = JSON.stringify(user)

            if (user.rol == "administrator"){
                navigate("/admin")
            }else{
                navigate("/dashboard")
            }
            

        } catch (error) {
            alert("Usuario o Contraseña incorrecta")
        }
    }

  

    return (
        <div className="Loginbody">
        <div className="Logincontainer">
    <div className="form-container" id="register">
        <h2 className="Loginh2">Iniciar Sesion</h2>
        <form className="Loginform">

                <label className="Loginlabel">Correo:</label>
                <input className="Logininput" type="email"  onChange={onChangeLogin} name="email" placeholder="Ingresa tu Correo"/>
                
                <label className="Loginlabel">Contraseña:</label>
                <input className="Logininput"type="password" onChange={onChangeLogin} name="password" placeholder="Ingresa tu Contraseña"/>
            <Button className="Loginbutton Hoverbutton " onClick={onSubmit} >Iniciar Sesion</Button>
        </form>
        <p className="Loginp">¿No tienes cuenta? <a href="/register" >Regístrate</a></p>
    </div>
</div>
    </div>
        
    
    )
}

export default Login;